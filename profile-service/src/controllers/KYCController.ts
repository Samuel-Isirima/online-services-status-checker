import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import Profile, { IProfile } from '../models/Profile';

export const uploadID = (async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    // const validationRule = {
    //     "kyc_id": 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    // };
    
    if(!req.file)
    {
        return res.status(401).send({ message: `No file uploaded.`})
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

    const { originalname, path } = req.file;
    //Delete the old profile picture
    if(profile.kyc_id)
    {
        try {
                const old_kyc_id: String = profile.kyc_id       
                const fs = require('fs')
                fs.unlinkSync(old_kyc_id)    //This is not asynchronous, good enough. I don't think deleting a profile pic should be 
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
    profile.kyc_id = path
    profile.kyc_id_upload_date = new Date()
    profile.save()


    if(!profile)
    {
        return res.status(401).send({ message: `ID upload failed.`})
    }

    return res.status(200).send({ message: `ID uploaded successfully. Our team will verify your ID and get back to you.`})
  
})




export const uploadProofOfResidence = (async(req: Request, res: Response, next: NextFunction) => 
{
    var profile: IProfile | null = null
    // const validationRule = {
    //     "kyc_id": 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    // };
    
    if(!req.file)
    {
        return res.status(401).send({ message: `No file uploaded.`})
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

    const { originalname, path } = req.file;
    //Delete the old profile picture
    if(profile.kyc_por)
    {
        try {
                const old_kyc_por: String = profile.kyc_por     
                const fs = require('fs')
                fs.unlinkSync(old_kyc_por)      //This is not asynchronous, good enough. I don't think deleting a profile pic should be 
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
    profile.kyc_por = path
    profile.kyc_por_upload_date = new Date()
    profile.save()


    if(!profile)
    {
        return res.status(401).send({ message: `Proof of residence upload failed.`})
    }

    return res.status(200).send({ message: `Proof of residence uploaded successfully. Our team will verify your ID and get back to you.`})
  
})

