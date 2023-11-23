import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getResource = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.collection_unique_id)
    {
        return res.status(401).send({ message: `Collection not specified.`})
    }

    //call the next middleware
    next()
})