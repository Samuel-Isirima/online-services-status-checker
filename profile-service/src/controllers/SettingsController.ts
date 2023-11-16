import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import Profile, { IProfile } from '../models/Profile';

export const updateSettings = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    const validationRule = {
        "theme": "required|string|min:4",
        "language": "required|string|min:4",
        "communication_channels": "required|string|min:3",
        "allow_ai_to_analyse_my_data": "required|boolean",
    };
    
    const validationResult: any = await RequestValidator(req.body, validationRule, {})
    .catch((err) => {
    console.error(err)
    })

    if(validationResult.status === false)
    {
    const errorMessages: String[] = validationResult.formattedErrors
    return res.status(401).send({ message: `Validation failed. ${errorMessages}`})
    }

    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id

    //Now check to see if any other profile has the same tag
    profile = await Profile.findOne({user_id: user_id})
    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }

    //Now update the settings
    profile.theme = req.body.theme
    profile.language = req.body.language
    profile.communication_channels = req.body.communication_channels
    profile.allow_ai_to_analyse_my_data = req.body.allow_ai_to_analyse_my_data

    profile = await profile.save()
    if(!profile)
    {
        return res.status(401).send({ message: `Settings update failed.`})
    }

    return res.status(200).send({ message: `Settings updated successful.`})
  
})

