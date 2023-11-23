import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getAction = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.action_unique_id)
    {
        return res.status(401).send({ message: `Action not specified.`})
    }

    //call the next middleware
    next()
})