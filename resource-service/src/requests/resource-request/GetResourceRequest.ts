import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getResourceRequest = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.resource_request_unique_id)
    {
        return res.status(401).send({ message: `Request identifier is not specified.`})
    }

    //call the next middleware
    next()
})