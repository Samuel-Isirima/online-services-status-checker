import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
import { createResource } from '../requests/resource/CreateResource';
const dotenv = require('dotenv');
dotenv.config();
const ResourceController = require('../controllers/ResourceController');

const resourceRouter: Router = Router()



resourceRouter.post('/create', Auth, createResource, ResourceController.create)
resourceRouter.get('/', Auth, ResourceController.index)
resourceRouter.get('/:identifier', Auth, ResourceController.get)
resourceRouter.post('/:identifier/update', Auth, ResourceController.update)

export default resourceRouter;