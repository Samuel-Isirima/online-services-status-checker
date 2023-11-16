import { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
const dotenv = require('dotenv');
dotenv.config();

import RequestValidator from '../helpers/RequestValidator';
import User, { IUser } from '../models/User';
import UserEmailVerification from '../models/UserEmailVerification';
import { generateRandomString } from '../utils/RandomStringGenerator';


export const register = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null

    const validationRule = {
        "email": "required|string|email",
        "first_name": "required|string",
        "last_name": "required|string",
        "password": "required|string|min:8",
        "confirm_password": "required|string|min:8",
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

    //check if passwords match
    if(req.body.password !== req.body.confirm_password)
    {
    return res.status(401).send({ message: `Passwords do not match.`})
    }

    //check if email already exists
    user = await User.findOne({email: req.body.email})

    if(user)
    {
    return res.status(401).send({ message: `Email already exists.`})
    }

    const payload = req.body  
    try 
    {
        var password: String = payload.password
        var saltRounds: number = 10
        var hashed_password: String = await bcrypt.hash(password, saltRounds)
        payload.password = hashed_password
        var unique_id = generateRandomString(32)

        //create user
        user = await User.create({
            email: payload.email,
            password: payload.password,
            unique_id: unique_id
        })

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

       
    } 
    catch (error) 
    {
    console.log(error)
    return res.status(403).send({ message: `An unexpected error has occured. Please try again later.`,
    error: error})
    }

  return res.status(200).send({ message: `Account created successfully. Welcome to the bank API!`})
})



