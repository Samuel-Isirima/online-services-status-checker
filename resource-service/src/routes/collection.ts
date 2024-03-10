import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';
const CollectionController = require('../controllers/CollectionController');

const collectionRouter: Router = Router()



collectionRouter.post('/create', Auth, CollectionController.create)
collectionRouter.get('/', Auth, CollectionController.index)
collectionRouter.get('/:id', Auth, CollectionController.get)
collectionRouter.post('/:id/update', Auth, CollectionController.update)

export default collectionRouter;