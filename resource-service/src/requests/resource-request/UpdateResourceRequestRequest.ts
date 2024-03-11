import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import RequestValidator from '../../helpers/RequestValidator';

export const updateResourceRequest = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.identifier)
    {
        return res.status(401).send({ message: `Request identifier is not specified.`})
    }
    
    const validationRule = {
        "method" : "required|string",
        "title": "string|min:4",
        "description": "string|min:4",
        "body_data": "string",
        "header_data": "string"
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