import RequestResponse, { IRequestResponse } from "../models/RequestResponse"

const amqp = require('amqplib')
const axios = require('axios')

async function consumeRequestQueue(queueName) 
{
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)

    //Create an Axios instance
    const instance = axios.create();

    // Add a request interceptor
    instance.interceptors.request.use((config) => 
    {
        config.metadata = { start_time: new Date() };
        return config;
    }, 
    (error) => 
    {
        return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use((response) => 
    {
        response.config.metadata.end_time = new Date();
        response.duration = response.config.metadata.end_time - response.config.metadata.start_time;
        return response;
    }, 
    (error) => 
    {
        return Promise.reject(error);
    });



    channel.consume(queueName, async (message) => 
    {
        /**
         * The message is a combination of ResourceRequest type and Resource type 
         * which is defined in the request-service/src/types/ResourceRequest.ts file.
         * 
         */
        if (message !== null) 
        {
            const request = JSON.parse(message.content.toString())
            console.log(`Received message from ${queueName}: ${request}`)

            //Send the request now
            const url = request.url;
            const method = request.method;
            const bodyData = request.body_data;
            const headersData = request.headers_data;
            //Now send the request
            const response = await axios({
                method: method,
                url: url,
                data: bodyData,
                headers: headersData
            })

            //Now send the response to the response queue or instead write it to the database
            //Create the element of the response class

            const requestResponse: IRequestResponse = await RequestResponse.create({
                request_id: request.request_id,
                response_body: response.data,
                response_headers: response.headers,
                http_status_code: response.status,
                response_time: response.duration
            })

            //Now send to module that'll process and check if this response is one the user is interested in (ie has created an interestedResponse for)

            channel.ack(message) // Acknowledge the message
        }
    })
}


// Consume messages from each queue
for (let i = 0; i < 10; i++) 
{
    const queueName = `REQUEST_SERVICE_REQUEST_SENDER_QUEUE_${i}`;
    consumeRequestQueue(queueName);
}