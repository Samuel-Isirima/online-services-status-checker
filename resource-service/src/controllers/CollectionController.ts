import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import Collection, { ICollection } from '../models/Collection';
import { generateRandomString } from '../utils/RandomStringGenerator';
import Resource, { IResource } from '../models/Resource';

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const collections: ICollection[] | void = await Collection.find({user_id: req.user.id})
    if(!collections)
    {
        return res.status(401).send({ message: `No collections found.`})
    }

    return res.status(200).send({ message: `Collections retrieved successfully.`, collections: collections})
})

export const create = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var collection: ICollection | null = null

    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id


    //now check if a resource with the same name exists
    collection = await Collection.findOne
    ({
        name: req.body.name,
        user_id: user_id,
    })

    if(collection)
    {
        return res.status(401).send({ message: `Collection with this name already exists.`})
    }


    const unique_id: String = generateRandomString(30).toLowerCase()
    //Now create a new collection
    collection = await Collection.create({
        user_id: user_id,
        name: req.body.name,
        unique_id: unique_id,
        tags: req.body.tags,
        description: req.body.description,
        display_image_url: req.body.display_image_url
    })


    return res.status(200).send({ message: `Collection created successfully.`, collection: collection})
})



export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const collection: ICollection | null = await Collection.findOne({ unique_id: req.params.identifier, user_id: req.user.id})
    
    if(!collection)
    {
        return res.status(401).send({ message: `Collection not found.`})
    }
    return res.status(200).send({ message: `Collection retrieved successfully.`, collection: collection})
})



export const getCollectionResources = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const resources: IResource[] | null = await Resource.find({ collection_unique_id: req.params.identifier, user_id: req.user.id})
    if(!resources)
    {
        return res.status(401).send({ message: `Resources not found.`})
    }
    return res.status(200).send({ message: `Resources retrieved successfully.`, resources: resources})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const collection: ICollection | null = await Collection.findOne({ unique_id: req.params.identifier, user_id: req.user.id})
    if(!collection)
    {
        return res.status(401).send({ message: `Collection not found.`})
    }

    //make sure there is no other collection with the same name
    const collection_ = await Collection.findOne({ name: req.body.name, user_id: req.user.id})
    if(collection_ && collection_.unique_id !== req.params.identifier)
    {
        return res.status(401).send({ message: `Collection with this name already exists.`})
    }
    
    //Now update the collection
    collection.name = req.body.name
    collection.description = req.body.description
    collection.display_image_url = req.body.display_image_url
    collection.tags = req.body.tags

    //save the collection
    await collection.save()

    return res.status(200).send({ message: `Collection updated successfully.`, collection: collection})
})

