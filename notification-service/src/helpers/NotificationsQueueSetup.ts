const amqp = require('amqplib')

export const setupRequestQueues = async function()
{
    const connection = await amqp.connect('amqp://localhost') 
    const channel = await connection.createChannel()
   
    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });

    const queueName = `NOTIFICATION_SERVICE_QUEUE`
    await channel.assertQueue(queueName)
    console.log(`Queue '${queueName}' created.`)

    
}
