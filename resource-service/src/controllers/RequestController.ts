import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import ResourceRequest, { IRequest } from '../models/Request';
import { generateRandomString } from '../utils/RandomStringGenerator';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const Requests: IRequest[] | void = await ResourceRequest.find({resource_id: req.params.resource_id})
    if(!Requests)
    {
        return res.status(401).send({ message: `No Requests found.`})
    }

    return res.status(200).send({ message: `Requests retrieved successfully.`, Requests: Requests})
})

export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var Request: IRequest | null = null

    //Now create a new Request
    Request = new ResourceRequest({
        title: req.body.title,
        method: req.body.method,
        resource_id: req.body.resource_id,
        description: req.body.description,
        body_data: req.body.body_data,
        headers_data: req.body.headers_data,
    })

    return res.status(200).send({ message: `Request created successfully.`, Request: Request})
})

export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const Request: IRequest | null = await ResourceRequest.findOne({ unique_id: req.params.unique_id })
    if(!Request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    return res.status(200).send({ message: `Request retrieved successfully.`, Request: Request})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const Request: IRequest | null = await ResourceRequest.findOne({ unique_id: req.params.unique_id })
    if(!Request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now update the Request
    Request.title = req.body.title
    Request.method = req.body.method
    Request.resource_id = req.body.resource_id
    Request.description = req.body.description
    Request.body_data = req.body.body_data
    Request.headers_data = req.body.headers_data
    

    return res.status(200).send({ message: `Request updated successfully.`, Request: Request})
})

