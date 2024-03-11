import { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';

import RequestValidator from '../helpers/RequestValidator';
import User, { IUser } from '../models/User';
import { Auth } from '../middleware/auth';

export const changePassword = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    var user: IUser | null = null


    // Get the user from the request object
    const user_ = req.user

    //Now find the user from the database
    user = await User.findById(user_.id)

    if(!user)
    {
        return res.status(401).send({ message: `User not found.`})
    }

    // Get the old password, password and confirm password from the request body
    const { old_password, password, confirm_password } = req.body

    // Check if the old password matches the one in the database
    if(!await bcrypt.compare(old_password, user.password))
    {
    return res.status(401).send({ message: `Invalid old password.`})
    }


    // Check if the password and confirm password match
    if(password !== confirm_password)
    {
        return res.status(401).send({ message: `Password and confirm password do not match.`})
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)


    // Update the password
    user.password = hashedPassword

    // Save the user to the database
    await user.save()

    //Send password change mail
    
    return res.status(200).send({ message: `Password change successful.`})
})