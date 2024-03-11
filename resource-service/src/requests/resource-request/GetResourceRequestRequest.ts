import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getResourceRequest = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.identifier)
    {
        return res.status(401).send({ message: `Request identifier is not specified.`})
    }

    //call the next middleware
    next()
})