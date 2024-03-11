import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getCollection = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.identifier)
    {
        return res.status(401).send({ message: `Collection ID is required.`})
    }

    //call the next middleware
    next()
})