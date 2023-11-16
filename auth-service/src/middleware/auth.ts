import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

declare global {
  namespace Express {
      interface Request {
          user?: any;
      }
  }
}
// Middleware to verify and decode JWT
export const Auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('authorization'); // or wherever you store your JWT in the request headers
  //strip out the bearer part of the token
  const tokenParts = token?.split(' ');
  const tokenValue = tokenParts?.length === 2 ? tokenParts[1] : token;


 if (!tokenValue) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(tokenValue, 'myjwtsecretneedtoputitin.envfile'); 
    req.user = decoded; // This will make the user details available in the request object
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
};
