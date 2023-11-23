import e, { Router, Request, Response, NextFunction} from "express"
import bodyParser from "body-parser";
import RequestValidator from "../../helpers/RequestValidator";

export const addInterestedResponse = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{

    const validationRule = {
        "title": "string|required",
        "description": "string|required",
        "request_id": "string|required",
        "category": "string",
        "http_status_code": "required_if:category,CODE",
        "http_status_code_range" : "required_if:category,CODE_RANGE",
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