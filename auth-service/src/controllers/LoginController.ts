import { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const dotenv = require('dotenv');
dotenv.config();

import RequestValidator from '../helpers/RequestValidator';
import User, { IUser } from '../models/User';


export const login = ( bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null

    const validationRule = {
        "email": "required|string|email",
        "password": "required|string|min:8",
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

    //check if passwords match
    if(!await bcrypt.compare(req.body.password, user.password))
    {
    return res.status(401).send({ message: `Incorrect password.`})
    }

    //check if email is verified
    if(!user.email_verified_at)
    {
    return res.status(401).send({ message: `Email is not verified.`})
    }

    //create token
    const token = jwt.sign({ id: user._id }, 'myjwtsecretneedtoputitin.envfile', { expiresIn: 86400 });

    //return token
    return res.status(200).send({ message: `Login successful.`, token: token})
})

