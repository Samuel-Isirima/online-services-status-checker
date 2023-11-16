import { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UUIDV4 } from 'sequelize';
import UserPasswordRecovery from '../models/UserPasswordRecovery';
const dotenv = require('dotenv');
dotenv.config();

import RequestValidator from '../helpers/RequestValidator';
import User, { IUser } from '../models/User';
import UserEmailVerification from '../models/UserEmailVerification';
import { register } from '../controllers/RegisterController';
import { login } from '../controllers/LoginController';
import { generateRandomString } from '../utils/RandomStringGenerator';



//Create route to request password recovery
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

    //delete all previous password recoveries
    await UserPasswordRecovery.deleteMany({ email: req.body.email });

    //create password recovery
    const token = generateRandomString(32)
    const expires_at = new Date()
    expires_at.setHours(expires_at.getHours() + 1)
    const passwordRecovery = await UserPasswordRecovery.create({
        email: req.body.email,
        token: token,
        expires_at: expires_at
    })

    //send password recovery

    //return message  
    return res.status(200).send({ message: `Password recovery token sent.`})
  })


//Create password recovery route
export const recoverPassword = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null

    const validationRule = {
        "email": "required|string|email",
        "token": "required|string",
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

    //check if email already exists
    user = await User.findOne({email: req.body.email})

    if(!user)
    {
    return res.status(401).send({ message: `Email does not exist.`})
    }

    //check if passwords match
    if(req.body.password !== req.body.confirm_password)
    {
    return res.status(401).send({ message: `Passwords do not match.`})
    }

    //check if token is valid
    const token = req.body.token
    const email = req.body.email
    const passwordRecovery = await UserPasswordRecovery.findOne({email: email, token: token, valid: true})

    if(!passwordRecovery)
    {
    return res.status(401).send({ message: `Invalid token.`})
    }

    //update password recovery
    passwordRecovery.valid = false
    await passwordRecovery.save()

    //update user
    var password: String = req.body.password
    var saltRounds: number = 10
    var hashed_password: String = await bcrypt.hash(password, saltRounds)
    user.password = hashed_password
    await user.save()

    //return token
    return res.status(200).send({ message: `Password recovery successful.`})
})
