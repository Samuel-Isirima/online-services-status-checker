import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
const RequestController = require('../controllers/RequestController');

const requestRouter: Router = Router()



// requestRouter.post('/create', Auth, RequestController.create)
// requestRouter.get('/', Auth, RequestController.index)
// requestRouter.get('/:identifier', Auth, RequestController.get)
// requestRouter.post('/:identifier/update', Auth, RequestController.update)

export default requestRouter;