import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';
import RequestValidator from '../../helpers/RequestValidator';

export const createResource = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{

    const validationRule = {
        "name" : "required|string|min:4",
        "tags": "string",
        "type": "required|string",
        "description": "string",
        "url": "required|string",
        "collection_id": "string",
        "display_image_url": "string"
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