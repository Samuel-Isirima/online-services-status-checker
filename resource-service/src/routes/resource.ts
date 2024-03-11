import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
import { createResource } from '../requests/resource/CreateResourceRequest';
const dotenv = require('dotenv');
dotenv.config();
const ResourceController = require('../controllers/ResourceController');
const CreateResourceRequest = require('../requests/resource/CreateResourceRequest');
const UpdateResourceRequest = require('../requests/resource/UpdateResourceRequest');
const GetResourceRequest = require('../requests/resource/GetResourceRequest');
const GetResourceRequestsRequest = require('../requests/resource/GetResourceRequestsRequest');  

const resourceRouter: Router = Router()



resourceRouter.post('/create', Auth, CreateResourceRequest.createResource, ResourceController.create)
resourceRouter.get('/:identifier', Auth, GetResourceRequest.getResource, ResourceController.get)
resourceRouter.get('/:identifier/requests', Auth, GetResourceRequestsRequest.getResourceRequests, ResourceController.getResourceRequests)
resourceRouter.post('/:identifier/update', Auth, UpdateResourceRequest.updateResource, ResourceController.update)

export default resourceRouter;