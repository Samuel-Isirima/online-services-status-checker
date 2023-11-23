import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import ResourceRequest, { IRequest } from '../models/ResourceRequest';
import { generateRandomString } from '../utils/RandomStringGenerator';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const requests: IRequest[] | void = await ResourceRequest.find({resource_id: req.params.resource_id})
    if(!requests)
    {
        return res.status(401).send({ message: `No Requests found.`})
    }
    return res.status(200).send({ message: `Requests retrieved successfully.`, requests: requests})
})

export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var request: IRequest | null = null

    const unique_id: String = generateRandomString(30).toLowerCase()

    //Now create a new Request
    request = new ResourceRequest({
        title: req.body.title,
        method: req.body.method,
        resource_id: req.body.resource_id,
        description: req.body.description,
        body_data: req.body.body_data,
        headers_data: req.body.headers_data,
        unique_id: unique_id,
    })
    
    if(!request)
    {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the Request.`})
    }

    return res.status(200).send({ message: `Request created successfully.`, request: request})
})


export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IRequest | null = await ResourceRequest.findOne({ unique_id: req.params.unique_id })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    return res.status(200).send({ message: `Request retrieved successfully.`, request: request})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IRequest | null = await ResourceRequest.findOne({ unique_id: req.params.unique_id })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now update the Request
    request.title = req.body.title
    request.method = req.body.method
    request.description = req.body.description
    request.body_data = req.body.body_data
    request.headers_data = req.body.headers_data

    //save the Request
    await request.save()

    return res.status(200).send({ message: `Request updated successfully.`, request: request})
})


export const updateActiveness = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IRequest | null = await ResourceRequest.findOne({ unique_id: req.params.resource_request_unique_id })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now update the Request
    request.active = req.body.active

    //save the Request
    await request.save()

    return res.status(200).send({ message: `Request status updated successfully.`, request: request})
})
