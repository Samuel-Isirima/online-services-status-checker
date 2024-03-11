import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
const ResourceRequestController = require('../controllers/ResourceRequestController');
const CreateResourceRequestRequest = require('../requests/resource-request/CreateResourceRequestRequest');
const UpdateResourceRequestRequest = require('../requests/resource-request/UpdateResourceRequestRequest');
const GetResourceRequestRequest = require('../requests/resource-request/GetResourceRequestRequest');
const GetResourceRequestsRequest = require('../requests/resource-request/GetResourceRequestsRequest');

const resourceRequestRouter: Router = Router()



resourceRequestRouter.post('/create', Auth, CreateResourceRequestRequest.createResourceRequest, ResourceRequestController.create)
resourceRequestRouter.get('/', Auth, GetResourceRequestsRequest.getResourceRequests, ResourceRequestController.index)
resourceRequestRouter.get('/:identifier', Auth, GetResourceRequestRequest.getResourceRequest,  ResourceRequestController.get)
resourceRequestRouter.post('/:identifier/update', Auth, UpdateResourceRequestRequest.updateResourceRequest, ResourceRequestController.update)

export default resourceRequestRouter;