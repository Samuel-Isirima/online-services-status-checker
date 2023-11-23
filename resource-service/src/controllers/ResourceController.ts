import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import Resource, { IResource } from '../models/Resource';
import { generateRandomString } from '../utils/RandomStringGenerator';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resources: IResource[] | void = await Resource.find()
    if(!resources)
    {
        return res.status(401).send({ message: `No resources found.`})
    }

    return res.status(200).send({ message: `Resources retrieved successfully.`, resources: resources})
})

export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var resource: IResource | null = null

    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id

    //Now create a new resource
    resource = new Resource({
        user_id: user_id,
        name: req.body.name,
        unique_id: generateRandomString(30).toLowerCase(),
        tags: req.body.tags,
        type: req.body.type,
        description: req.body.description,
        url: req.body.url,
        collection_id: req.body.collection_id,
    })

    return res.status(200).send({ message: `Resource created successfully.`, resource: resource})
})

export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resource: IResource | null = await Resource.findOne({ unique_id: req.params.unique_id })
    if(!resource)
    {
        return res.status(401).send({ message: `Resource not found.`})
    }
    return res.status(200).send({ message: `Resource retrieved successfully.`, resource: resource})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resource: IResource | null = await Resource.findOne({ unique_id: req.params.unique_id })
    if(!resource)
    {
        return res.status(401).send({ message: `Resource not found.`})
    }

    //Now update the resource
    resource.name = req.body.name
    resource.description = req.body.description
    resource.url = req.body.url
    resource.collection_id = req.body.collection_id

    //save the resource
    await resource.save()

    return res.status(200).send({ message: `Resource updated successfully.`, resource: resource})
})

