import RequestResponse, { IRequestResponse } from "../models/RequestResponse"

const amqp = require('amqplib')
const axios = require('axios')

interface INotification {
    type: String;
    message: String;
    recipient: String;
    other_details: Object;
    }


async function consumeNotificationQueue(queueName) 
{
    const connection = await amqp.connect('amqp://localhost')
    const channel = await connection.createChannel()
    await channel.assertQueue(queueName)

    channel.consume(queueName, async (message) => 
    {
        /**
         * The message is a type of INotification.
         * 
         */
        if (message !== null) 
        {
            const notification: INotification = JSON.parse(message.content.toString())
            console.log(`Received message from ${queueName}: ${notification}`)
            //Check the type of notification and send it to the appropriate queue
            if(notification.type === "email")
            {
                //Send to the email queue
                const email = notification.recipient;
                const message = notification.message;
                const otherDetails = notification.other_details;
                //Send to the email queue
                await channel.sendToQueue("NOTIFICATION_SERVICE_EMAIL_QUEUE", Buffer.from(JSON.stringify({email, message, otherDetails})));
            }
            else if(notification.type === "slack")
            {
                //Send to the slack queue
                const slack = notification.recipient;
                const message = notification.message;
                const otherDetails = notification.other_details;
                //Send to the slack queue
                await channel.sendToQueue("NOTIFICATION_SERVICE_SLACK_QUEUE", Buffer.from(JSON.stringify({slack, message, otherDetails})));
            }
            else
            {
                  //Send to the slack queue
                  const sms = notification.recipient;
                  const message = notification.message;
                  const otherDetails = notification.other_details;
                  //Send to the slack queue
                  await channel.sendToQueue("NOTIFICATION_SERVICE_SMS_QUEUE", Buffer.from(JSON.stringify({sms, message, otherDetails})));
            }
        
            channel.ack(message) // Acknowledge the message
        }
    })
}


// Consume messages from each queue

const queueName = `NOOTIFICATION_SERVICE_QUEUE`;
consumeNotificationQueue(queueName);
