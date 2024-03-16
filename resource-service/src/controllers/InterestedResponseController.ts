import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import InterestedResponse, { IInterestedResponse } from '../models/InterestedResponse';
import { generateRandomString } from '../utils/RandomStringGenerator';
import ResourceRequest, { IResourceRequest } from '../models/ResourceRequest';
import Resource, { IResource } from '../models/Resource';
const dotenv = require('dotenv');
dotenv.config();


export const create = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var interested_response: IInterestedResponse | null = null

    //confirm that the request exists, and is owned by this user
    const user = req.user

    //check if the request exists and is owned by the user
    const request: IResourceRequest | null = await ResourceRequest.findOne
    ({
        unique_id: req.body.request_identifier,
    })


    if(!request)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now get the resource attached to the request and confirm if the user owns it

    const resource: IResource | null = await Resource.findOne({
        unique_id: request.resource_unique_id,
        user_id: user.id,
    }) 

    if(!resource)
    {
        return res.status(401).send({ message: `Request not found.`})
    }

    //Now make sure the name is unique to this request
    const response: IInterestedResponse | null = await InterestedResponse.findOne({
        request_unique_id: req.body.request_identifier,
        title: req.body.title
    })

    if(response)
        return res.status(400).send({ message: `A Response already exists with this title`})

    const unique_id: String = generateRandomString(30).toLowerCase()

    //Now create a new interested_response
    interested_response = await InterestedResponse.create({
        unique_id: unique_id,
        title: req.body.title,
        request_unique_id: req.body.request_identifier,
        category: req.body.category,
        http_status_code: req.body.http_status_code,
        http_status_code_range: req.body.http_status_code_range,
    })
    
    if(!interested_response)
    {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the response record.`})
    }

    return res.status(200).send({ message: `Response created successfully.`, response: interested_response})
})


export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const user = req.user

    const interested_response: IInterestedResponse | null = await InterestedResponse.findOne({ unique_id: req.params.identifier })
    if(!interested_response)
    {
        return res.status(401).send({ message: `Response not found.`})
    }
     //check if the request exists and is owned by the user
     const request: IResourceRequest | null = await ResourceRequest.findOne
     ({
         unique_id: interested_response.request_unique_id,
     })
     if(!request)
     {
         return res.status(401).send({ message: `Response not found.`})
     }
     //Now get the resource attached to the request and confirm if the user owns it
     const resource: IResource | null = await Resource.findOne({
         unique_id: request.resource_unique_id,
         user_id: user.id,
     }) 
 
     if(!resource)
     {
         return res.status(401).send({ message: `Response not found.`})
     }

    return res.status(200).send({ message: `Response retrieved successfully.`, response: interested_response})
})


export const update = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const interested_response: IInterestedResponse | null = await InterestedResponse.findOne({ unique_id: req.params.unique_id })
    if(!interested_response)
    {
        return res.status(401).send({ message: `Response not found.`})
    }

    //Update the interested_response record
    interested_response.title = req.body.title
    interested_response.description = req.body.description
    
    //Save the interested_response record
    await interested_response.save()
    
    return res.status(200).send({ message: `Response updated successfully.`, response: interested_response})
})