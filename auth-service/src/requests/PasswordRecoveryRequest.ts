import e, { Router, Request, Response, NextFunction} from "express"
import bodyParser from "body-parser";
import RequestValidator from "../helpers/RequestValidator";

export const requestToken = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{

    const validationRule = {
        "email": "string|required",
    };
    
    const validationResult: any = await RequestValidator(req.body, validationRule, {})
    .catch((err) => {
    console.error(err)
    })
    
    
    if(validationResult.status === false)
    {
    const errorMessages: String[] = validationResult.formattedErrors
    return res.status(401).send({ message: `${errorMessages[0]}`})
    }
    
    //call the next middleware
    next()
})


export const resetPassword = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
   
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
    return res.status(401).send({ message: `${errorMessages[0]}`})
    }
    
    //call the next middleware
    next()
})


