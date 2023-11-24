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