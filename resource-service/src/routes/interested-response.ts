import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
const InterestedResponseController = require('../controllers/InterestedResponseController');
const CreateInterestedResponseRequest = require('../requests/interested-response/CreateInterestedResponseRequest');
const UpdateInterestedResponseRequest = require('../requests/interested-response/UpdateInterestedResponseRequest');
const GetInterestedResponseRequest = require('../requests/interested-response/GetInterestedResponseRequest');
// const GetInterestedResponseRequestsRequest = require('../requests/interested-response/GetInterestedResponseRequestsRequest');  

const interestedResponseRouter: Router = Router()



interestedResponseRouter.post('/create', Auth, CreateInterestedResponseRequest.createInterestedResponse, InterestedResponseController.create)
interestedResponseRouter.get('/:identifier', Auth, GetInterestedResponseRequest.getInterestedResponse, InterestedResponseController.get)
// interestedResponseRouter.get('/:identifier/requests', Auth, GetInterestedResponseRequestsRequest.getInterestedResponseRequests, InterestedResponseController.getInterestedResponseRequests)
interestedResponseRouter.post('/:identifier/update', Auth, UpdateInterestedResponseRequest.updateInterestedResponse, InterestedResponseController.update)

export default interestedResponseRouter;