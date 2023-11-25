const amqp = require('amqplib')
const axios = require('axios')

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