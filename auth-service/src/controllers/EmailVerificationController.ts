import { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();

import RequestValidator from '../helpers/RequestValidator';
import User, { IUser } from '../models/User';
import UserEmailVerification from '../models/UserEmailVerification';
import { generateRandomString } from '../utils/RandomStringGenerator';


//Create route to request email verification
export const requestToken = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null

    const validationRule = {
        "email": "required|string|email",
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

    //check if email already exists
    user = await User.findOne({email: req.body.email})

    if(!user)
    {
    return res.status(401).send({ message: `Email does not exist.`})
    }

    //check if email is verified
    if(user.email_verified_at)
    {
    return res.status(401).send({ message: `Email is already verified.`})
    }

    //delete all previous email verifications
    await UserEmailVerification.deleteMany({ email: req.body.email });

    //create email verification
    const token = generateRandomString(32)
    const expires_at = new Date()
    expires_at.setHours(expires_at.getHours() + 1)
    const emailVerification = await UserEmailVerification.create({
        email: req.body.email,
        token: token,
        expires_at: expires_at
    })

    //send email verification

    //return message  
    return res.status(200).send({ message: `Email verification token sent.`})
  })


//Create email verification route
export const verifyEmail = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null

    const validationRule = {
        "email": "required|string|email",
        "token": "required|string",
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

    //check if email already exists
    user = await User.findOne({email: req.body.email})

    if(!user)
    {
    return res.status(401).send({ message: `Email does not exist.`})
    }

    //check if email is verified
    if(user.email_verified_at)
    {
    return res.status(401).send({ message: `Email is already verified.`})
    }

    //check if token is valid
    const token = req.body.token
    const email = req.body.email
    const emailVerification = await UserEmailVerification.findOne({email: email, token: token, valid: true})

    if(!emailVerification)
    {
    return res.status(401).send({ message: `Invalid token.`})
    }

    //update email verification
    emailVerification.valid = false
    await emailVerification.save()

    //update user
    user.email_verified_at = new Date()
    await user.save()

    //return token
    return res.status(200).send({ message: `Email verification successful.`})
})

