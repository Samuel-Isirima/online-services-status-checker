import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import RequestValidator from '../../helpers/RequestValidator';

export const createResourceRequest = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{

    const validationRule = {
        "title": 'string|required',
        "method": 'string|required',
        "resource_identifier": 'string|required',
        "description": 'string',
        "body_data": 'string',
        "headers_data" : 'string',
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

    if((req.body.method !in ['POST', 'GET', 'PUT', 'PATCH']))
    {
        return res.status(401).send({ message: `Please select a valid and supported HTTP method`})
    }
    
    //call the next middleware
    next()
})