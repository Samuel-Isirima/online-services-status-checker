import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import ResourceRequest, { IRequest } from '../models/ResourceRequest';
import { generateRandomString } from '../utils/RandomStringGenerator';
import Action, { IAction } from '../models/Action';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const actions: IAction[] | void = await Action.find({request_id: req.params.interested_response})
    if(!actions)
    {
        return res.status(401).send({ message: `No Actions found for this request.`})
    }
    return res.status(200).send({ message: `Actions retrieved successfully.`, actions: actions})
})


export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var action: IAction | null = null

    const unique_id: String = generateRandomString(30).toLowerCase()

    //Now create a new Action
    action = new Action({
        unique_id: unique_id,
        interested_response_id: req.body.interested_response_id,
        notifications_config: req.body.notifications_config,
        webhooks_config: req.body.webhooks_config,
        custom_message: req.body.custom_message,
    })
    
    if(!action)
    {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the action.`})
    }

    return res.status(200).send({ message: `Action created successfully.`, action: action})
})


export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const action: IAction | null = await Action.findOne({ unique_id: req.params.unique_id })
    if(!action)
    {
        return res.status(401).send({ message: `Action not found.`})
    }
    return res.status(200).send({ message: `Action retrieved successfully.`, action: action})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const action: IAction | null = await Action.findOne({ unique_id: req.params.unique_id })
    if(!action)
    {
        return res.status(401).send({ message: `Action not found.`})
    }

    //Now update the Request
    action.custom_message = req.body.custom_message
    action.notifications_config = req.body.notifications_config
    action.webhooks_config = req.body.webhooks_config   

    //save the Action
    await action.save()

    return res.status(200).send({ message: `Action updated successfully.`, action: action})
})
