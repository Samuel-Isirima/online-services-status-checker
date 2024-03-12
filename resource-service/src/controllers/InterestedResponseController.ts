import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import InterestedResponse, { IInterestedResponse } from '../models/InterestedResponse';
import { generateRandomString } from '../utils/RandomStringGenerator';
const dotenv = require('dotenv');
dotenv.config();

export const index = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) =>
{
    const interested_responses: IInterestedResponse[] | void = await InterestedResponse.find({request_id: req.params.request_id})
    if(!interested_responses)
    {
        return res.status(401).send({ message: `No responses found.`})
    }
    return res.status(200).send({ message: `Responses retrieved successfully.`, interested_responses: interested_responses})
})

export const add = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
    var interested_response: IInterestedResponse | null = null
    const unique_id: String = generateRandomString(30).toLowerCase()

    //Now create a new interested_response
    interested_response = await InterestedResponse.create({
        unique_id: unique_id,
        title: req.body.title,
        request_id: req.body.request_id,
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
    const interested_response: IInterestedResponse | null = await InterestedResponse.findOne({ unique_id: req.params.unique_id })
    if(!interested_response)
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