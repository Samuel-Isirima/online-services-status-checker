import e, { Router, Request, Response, NextFunction} from 'express'
import bodyParser from 'body-parser';

export const getInterestedResponse = (bodyParser.urlencoded(), async(req: Request, res: Response, next: NextFunction) => 
{
    if(!req.params.interested_response_unique_id)
    {
        return res.status(401).send({ message: `Response not specified.`})
    }

    //call the next middleware
    next()
})