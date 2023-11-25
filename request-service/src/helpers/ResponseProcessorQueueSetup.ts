const amqp = require('amqplib')

export const setupResponseProcessorQueues = async function()
{
    const connection = await amqp.connect('amqp://localhost') 
    const channel = await connection.createChannel()
   
    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });

    for (let i = 0; i < 10; i++) 
    {
        const queueName = `REQUEST_SERVICE_RESPONSE_PROCESSOR_QUEUE_${i}`
        await channel.assertQueue(queueName)
        console.log(`Queue '${queueName}' created.`)
    }

    
}
