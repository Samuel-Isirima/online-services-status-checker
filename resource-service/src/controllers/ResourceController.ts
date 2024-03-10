import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import Resource, { IResource } from '../models/Resource';
import { generateRandomString } from '../utils/RandomStringGenerator';
import Collection, { ICollection } from '../models/Collection';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resources: IResource[] | void = await Resource.find({user_id: req.user.id})
    if(!resources)
    {
        return res.status(401).send({ message: `No resources found.`})
    }

    return res.status(200).send({ message: `Resources retrieved successfully.`, resources: resources})
})

export const create = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var resource: IResource | null = null

    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id

    const unique_id: String = generateRandomString(30).toLowerCase()

    //First confirm if this user owns the collection
    var collection: ICollection | null = null
    console.log('These are the params', req.body)
    collection = await Collection.findOne
    ({
        unique_id: req.body.collection_identifier,
        user_id: user_id
    })
    if(!collection)
    {
        return res.status(401).send({ message: `Collection not found.`})
    }

    //now check if a resource with the same name exists
    resource = await Resource.findOne
    ({
        name: req.body.name,
        collection_unique_id: req.body.collection_identifier,
    })
    if(resource)
    {
        return res.status(401).send({ message: `Resource with this name already exists.`})
    }

    //Now create a new resource
    resource = await Resource.create({
        user_id: user_id,
        name: req.body.name,
        unique_id: unique_id,
        tags: req.body.tags,
        type: req.body.type,
        description: req.body.description,
        url: req.body.url,
        collection_unique_id: req.body.collection_identifier,
    })

    return res.status(200).send({ message: `Resource created successfully.`, resource: resource})
})


export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resource: IResource | null = await Resource.findOne({ unique_id: req.params.identifier, user_id: req.user.id})
    if(!resource)
    {
        return res.status(401).send({ message: `Resource not found.`})
    }
    return res.status(200).send({ message: `Resource retrieved successfully.`, resource: resource})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resource: IResource | null = await Resource.findOne({ unique_id: req.params.identifier })
    if(!resource)
    {
        return res.status(401).send({ message: `Resource not found.`})
    }

    //make sure there is no other resource with the same name
    const resource_ = await Resource.findOne({ name: req.body.name, collection_unique_id: resource.collection_unique_id})
    if(resource_ && resource_.unique_id !== req.params.identifier)
    {
        return res.status(401).send({ message: `Resource with this name already exists.`})
    }
    

    //Now update the resource
    resource.name = req.body.name
    resource.description = req.body.description
    resource.url = req.body.url
    resource.display_image_url = req.body.display_image_url

    //save the resource
    await resource.save()

    return res.status(200).send({ message: `Resource updated successfully.`, resource: resource})
})

