import { type } from "os";
import { IAction } from "../models/imported/Action";
import InterestedResponse from "../models/imported/InterestedResponse";

interface INotification {
type: String;
message: String;
recipient: String;
other_details: Object;
}

export const processActions = async (actions: IAction[]) => 
{
    //for each action, send a message to the notification service queue
    actions.forEach(async (action) => 
    {
        //Get action's notification configuration
        const notificationConfiguration = action.notifications_config;
        if(notificationConfiguration.email)
        {
            //Create notification object for email and send over to the notification service

            //to get recipient, get the interested response and then get the request and then get the user

            const interestedResponse = await InterestedResponse.findOne({_id: action.interested_response_id});
            if(!interestedResponse)
            {
                return;
            }




            const notification: INotification = 
            {
                type: "email",
                message: action.custom_message,
                recipient: "email",
                other_details: {}
            }
        }
        if(notificationConfiguration.slack)
        {
            //create notification object for slack and send over to the notification service
        }
        if(notificationConfiguration.sms)
        {
            //create notification object for sms and send over to the notification service
        }
        //Send a message to the notification service queue
        //The message should contain the action id and the interested response id
        //The notification service will then get the action and the interested response and then send a notification to the user
    });
}