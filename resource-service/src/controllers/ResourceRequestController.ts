import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import ResourceRequest, { IResourceRequest } from '../models/ResourceRequest';
import { generateRandomString } from '../utils/RandomStringGenerator';
import Resource, { IResource } from '../models/Resource';
import InterestedResponse, { IInterestedResponse } from '../models/InterestedResponse';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const requests: IResourceRequest[] | void = await ResourceRequest.find({resource_unique_id: req.params.resource_identifier})
    if(!requests)
    {
        return res.status(401).send({ message: `No Requests found.`})
    }
    return res.status(200).send({ message: `Requests retrieved successfully.`, requests: requests})
})



export const create = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var request: IResourceRequest | null = null

    //check if the resource exists and is owned by the user
    const resource: IResource | null = await Resource.findOne
    ({
        unique_id: req.body.resource_identifier,
        user_id: req.user.id
    })

    if(!resource)
    {
        return res.status(401).send({ message: `Resource not found.`})
    }

    const unique_id: String = generateRandomString(30).toLowerCase()

    //Make sure the request title is unique
    request = await ResourceRequest.findOne
    ({
        title: req.body.title,
        resource_unique_id: req.body.resource_identifier
    })

    if(request)
    {
        return res.status(401).send({ message: `Request with this title already exists.`})
    }

    //Now create a new Request
    request =  await ResourceRequest.create({
        title: req.body.title,
        method: req.body.method,
        resource_unique_id: req.body.resource_identifier,
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
    const request: IResourceRequest | null = await ResourceRequest.findOne({ unique_id: req.params.identifier })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    //check if the resource exists and is owned by the user
    const resource: IResource | null = await Resource.findOne
    ({
        unique_id: request.resource_unique_id,
        user_id: req.user.id
    })
    if(!resource)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    return res.status(200).send({ message: `Request retrieved successfully.`, request: request})
})




export const getAllInterestedResponses = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IResourceRequest | null = await ResourceRequest.findOne({ unique_id: req.params.identifier })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    //check if the resource exists and is owned by the user
    const resource: IResource | null = await Resource.findOne
    ({
        unique_id: request.resource_unique_id,
        user_id: req.user.id
    })
    if(!resource)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now get the responses for this request
    const responses: IInterestedResponse[] | null = await InterestedResponse.find({
        request_unique_id: req.params.identifier
    })
    return res.status(200).send({ message: `Responses retrieved successfully.`, responses: responses})
})




export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IResourceRequest | null = await ResourceRequest.findOne({ unique_id: req.params.identifier })
    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }
    //check if the resource exists and is owned by the user
    const resource: IResource | null = await Resource.findOne
    ({
        unique_id: request.resource_unique_id,
        user_id: req.user.id
    })
    if(!resource)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //make sure the new title is unique
    const newRequest: IResourceRequest | null = await ResourceRequest.findOne
    ({
        title: req.body.title,
        resource_unique_id: request.resource_unique_id
    })
    if(newRequest)
    {
        return res.status(401).send({ message: `Request with this title already exists.`})
    }

    //Now update the Request
    request.title = req.body.title
    request.description = req.body.description
    request.body_data = req.body.body_data
    request.headers_data = req.body.headers_data

    //save the Request
    await request.save()

    return res.status(200).send({ message: `Request updated successfully.`, request: request})
})


export const updateActiveness = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const request: IResourceRequest | null = await ResourceRequest.findOne({ unique_id: req.params.resource_request_unique_id })
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
