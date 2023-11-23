const amqp = require('amqplib')
const axios = require('axios')

async function consumeRequestQueue(queueName) 
{
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()

    await channel.assertQueue(queueName)

    channel.consume(queueName, async (message) => 
    {
        if (message !== null) 
        {
            const requestData = message.content.toString()
            console.log(`Received message from ${queueName}: ${requestData}`)

            // Send request to the endpoint
            try 
            {
                const response = await axios.post('YOUR_ENDPOINT_URL', requestData)
                console.log('Request sent:', response.data)
            } 
            catch (error) 
            {
                console.error('Error sending request:', error)
            }

            channel.ack(message) // Acknowledge the message
        }
    })
}