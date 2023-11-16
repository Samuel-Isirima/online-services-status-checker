import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import Profile, { IProfile } from '../models/Profile';
import { generateRandomString } from '../utils/RandomStringGenerator';

export const updateTag = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    const validationRule = {
        "tag": "required|string|min:4",
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
    profile = await Profile.findOne({tag: req.body.tag})

    if(profile)
    {
        return res.status(401).send({ message: `Tag already in use by another account.`})
    }

    //If not, update the tag
    profile = await Profile.findOneAndUpdate({user_id: user_id}, {tag: req.body.tag})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    return res.status(200).send({ message: `Tag change successful.`})
  
})


export const create = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    /**
     * Details are;
     * DOB, sex, country, nationality, phone
     * 
     */

    var profile: IProfile | null = null
    const validationRule = {
        'dob' : 'date',//|before:2010/01/01|after:1900/01/01',
        "sex": "required|string",
        "country": "required|string",
        "nationality": "required|string",
        "phone": "required|string",
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

    //Now update the profile based on the user id
    profile = await Profile.findOne({user_id: user_id})

    if(profile)
    {
        return res.status(401).send({ message: `Profile already exists.`})
    }

    //Now create a new profile
    profile = new Profile()
    profile.user_id = user_id

    //Now update the profile
    profile.dob = req.body.dob
    profile.sex = req.body.sex
    profile.country = req.body.country
    profile.nationality =  req.body.nationality
    profile.phone = req.body.phone
    profile.tag = generateRandomString(8).toLowerCase()
    profile.unique_id = generateRandomString(30).toLowerCase()

    //Now save the profile
    await profile.save()

    return res.status(200).send({ message: `Profile created successfully.`})
})



export const updateProfilePicture = (async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    // const validationRule = {
    //     'profile_picture' : 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    // };

    if(!req.file)
    {
        return res.status(401).send({ message: `No file uploaded.`})
    }


    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id

    profile = await Profile.findOne({user_id: user_id})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    const { originalname, path } = req.file;
    //Delete the old profile picture
    if(profile.profile_picture)
    {
        try {
                const oldProfilePicture: String = profile.profile_picture       
                const fs = require('fs')
                fs.unlinkSync(oldProfilePicture)    //This is not asynchronous, good enough. I don't think deleting a profile pic should be 
                                                    //a non blocking operation
            } catch (error) 
            {
                console.log(error)
            }
    }
    else
    {
        //LOG THIS
    }

    //Now update the profile
    profile.profile_picture = path
    profile.save()

    return res.status(200).send({ message: `Profile photo uploaded successfully.`})
  
})


export const updateOccupation = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    const validationRule = {
        "occupation": "required|string|min:8",
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

    //If not, update the tag
    profile = await Profile.findOneAndUpdate({user_id: user_id}, {occupation: req.body.occupation})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    return res.status(200).send({ message: `Occupation changed successfully.`})
  
})




export const updateMonthlyIncome = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    const validationRule = {
        "monthly_income": "required|string|min:2",
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

    //If not, update the tag
    profile = await Profile.findOneAndUpdate({user_id: user_id}, {monthly_income: req.body.occupation})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    return res.status(200).send({ message: `Monthly income changed successfully.`})
  
})




export const updateFiveThingsYouSpendTheMostMoneyOn = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    const validationRule = {
        "ftystmmo": "required|string|min:15",
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

    //If not, update the tag
    profile = await Profile.findOneAndUpdate({user_id: user_id}, {ftystmmo: req.body.ftystmmo})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    return res.status(200).send({ message: `Updated successfully.`})
  
})




export const get = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    

    // Get the user from the request object
    const user_ = req.user
    const user_id: String = user_.id

    //If not, update the tag
    profile = await Profile.findOne({user_id: user_id})

    if(!profile)
    {
        return res.status(401).send({ message: `Profile not found.`})
    }
    return res.status(200).send({ message: `Profile fetched.`})
  
})