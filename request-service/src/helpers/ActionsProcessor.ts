import { type } from "os";
import { IAction } from "../models/imported/Action";
import InterestedResponse from "../models/imported/InterestedResponse";
import User, { IUser } from "../models/imported/User";
const amqp = require('amqplib')

interface INotification {
type: String;
message: String;
recipient: String;
other_details: Object;
}

export const processActions = async (actions: IAction[]) => 
{
    //Create connection to the notification service queue


    //for each action, send a message to the notification service queue
    actions.forEach(async (action) => 
    {
        //Get action's notification configuration
        const notificationConfiguration = action.notifications_config;
                    //Get user's email address
        const user: IUser | null = await User.findOne({ _id: action.user_id });
        if(!user)
        {   
            console.log("User not found");
            return false;
        }
        
        if(notificationConfiguration.email)
        {
            //Create notification object for email and send over to the notification service
            const email = user.email;

            const notification: INotification = 
            {
                type: "email",
                message: action.custom_message,
                recipient: email,
                other_details: {}
            }

            sendNotificationObjectToQueue(notification);

        }
        if(notificationConfiguration.slack)
        {
            const slack = ''

            const notification: INotification = 
            {
                type: "slack",
                message: action.custom_message,
                recipient: slack,
                other_details: {}
            }
            //create notification object for slack and send over to the notification service

            sendNotificationObjectToQueue(notification);
        }
        if(notificationConfiguration.sms)
        {
            const sms = '';

            const notification: INotification = 
            {
                type: "sms",
                message: action.custom_message,
                recipient: sms,
                other_details: {}
            }
            //create notification object for sms and send over to the notification service

            sendNotificationObjectToQueue(notification);
        }
        //Send a message to the notification service queue
        //The message should contain the action id and the interested response id
        //The notification service will then get the action and the interested response and then send a notification to the user
    });
}


const sendNotificationObjectToQueue = async (notification: INotification) =>
{
    const queue = "notification_service_queue";

    try {
        const connection = await amqp.connect("amqp://localhost");
        const channel = await connection.createChannel();
    
        await channel.assertQueue(queue, { durable: false });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(notification)));
        await channel.close();
      } 
      catch (err) 
      {
        console.warn(err);
      }
}