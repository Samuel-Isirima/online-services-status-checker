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
    .catch((err) => {
        console.error(err)
    })

    return res.status(200).send({ message: `Resources retrieved successfully.`, resources: resources})
})

export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    /**
     * Details are;
     * DOB, sex, country, nationality, phone
     * 
     */

    var resource: IResource | null = null
    const validationRule = {
        "name" : "required|string|min:4",
        "tags": "string",
        "type": "required|string",
        "description": "string",
        "url": "required|string",
        "collection_id": "string",
    };
    
    const validationResult: any = await RequestValidator(req.body, validationRule, {})
    .catch((err) => {
    console.error(err)
    })

    if(validationResult.status === false)
    {
    const errorMessages: String[] = validationResult.formattedErrors
    return res.status(401).send({ message: `${errorMessages[0]}`})
    }

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


