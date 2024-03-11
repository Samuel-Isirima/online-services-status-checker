import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getResourceRequests = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.resource_identifier)
    {
        return res.status(401).send({ message: `Resource not specified.`})
    }

    //call the next middleware
    next()
})