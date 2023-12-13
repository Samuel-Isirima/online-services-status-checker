const amqp = require('amqplib')

export const setupResponseProcessorQueues = async function()
{
    const connection = await amqp.connect('amqp://localhost') 
    const channel = await connection.createChannel()
   
    process.once("SIGINT", async () => {
        await channel.close();
        await connection.close();
      });


    const queueName = `NOTIFICATION_SERVICE_SMS_QUEUE`
    await channel.assertQueue(queueName)
    console.log(`Queue '${queueName}' created.`)
    
}
