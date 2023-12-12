import RequestResponse, { IRequestResponse } from "../models/RequestResponse"
import InterestedResponse, { IInterestedResponse } from "../models/imported/InterestedResponse"

const amqp = require('amqplib')

async function consumeRequestQueue(queueName) 
{
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)

    channel.consume(queueName, async (message) => 
    {
        /**
         * The message is a combination of ResourceRequest type and Resource type 
         * which is defined in the request-service/src/types/ResourceRequest.ts file.
         * 
         */
        if (message !== null) 
        {
            const response = JSON.parse(message.content.toString())

            //Save the response to the database
      
            const newResponse = await RequestResponse.create({
                request_id: response.request_id,
                http_status_code: response.http_status_code,
                response_body: response.response_body,
                response_headers: response.response_headers,
                response_time: response.response_time
            });

            //Now check if the user has an interested response for this response code under this request
            //No need to let the database do this as it will be very slow. 
            //Instead, get all the interested responses for this request and then filter them in the code

            const interestedResponses = await InterestedResponse.find({request_id: response.request_id});

            //Now filter the interested responses
            const filteredInterestedResponses: IInterestedResponse[] = interestedResponses.filter((interestedResponse) => 
            {
                return interestedResponse.http_status_code === response.http_status_code || interestedResponse.http_status_code_range.includes(response.http_status_code);
            });

            if(filteredInterestedResponses.length === 0)
            {
                //No interested response for this response
                channel.ack(message) // Acknowledge the message
                return;
            }
            //Now get all the actions for these interested responses
            const actions = filteredInterestedResponses.map((interestedResponse) => 
            {
                return interestedResponse.getActions();
            });

            //Now send the actions to the action service

            channel.ack(message) // Acknowledge the message
        }
    })
}


// Consume messages from each queue
for (let i = 0; i < 10; i++) 
{
    const queueName = `REQUEST_SERVICE_RESPONSE_PROCESSOR_QUEUE_${i}`;
    consumeRequestQueue(queueName);
}