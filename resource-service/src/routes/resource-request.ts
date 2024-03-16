import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
const ResourceRequestController = require('../controllers/ResourceRequestController');
const CreateResourceRequestRequest = require('../requests/resource-request/CreateResourceRequestRequest');
const UpdateResourceRequestRequest = require('../requests/resource-request/UpdateResourceRequestRequest');
const GetResourceRequestRequest = require('../requests/resource-request/GetResourceRequestRequest');
const GetInterestedResponsesRequest = require('../requests/resource-request/GetInterestedResponsesRequest');

const resourceRequestRouter: Router = Router()



resourceRequestRouter.post('/create', Auth, CreateResourceRequestRequest.createResourceRequest, ResourceRequestController.create)
resourceRequestRouter.get('/:identifier', Auth, GetResourceRequestRequest.getResourceRequest,  ResourceRequestController.get)
resourceRequestRouter.get('/:identifier/responses', Auth, GetInterestedResponsesRequest.getInterestedResponses,  ResourceRequestController.getAllInterestedResponses)
resourceRequestRouter.post('/:identifier/update', Auth, UpdateResourceRequestRequest.updateResourceRequest, ResourceRequestController.update)

export default resourceRequestRouter;