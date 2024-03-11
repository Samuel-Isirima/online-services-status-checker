import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
const dotenv = require('dotenv');
dotenv.config();
import bcrypt from 'bcrypt';
const CollectionController = require('../controllers/CollectionController');
const CreateCollectionRequest = require('../requests/collection/CreateCollectionRequest');
const UpdateCollectionRequest = require('../requests/collection/UpdateCollectionRequest');
const GetCollectionRequest = require('../requests/collection/GetCollectionRequest');
const GetCollectionResourcesRequest = require('../requests/collection/GetCollectionResourcesRequest'); 
const collectionRouter: Router = Router()



collectionRouter.post('/create', Auth, CreateCollectionRequest.createCollection, CollectionController.create)
collectionRouter.get('/', Auth, CollectionController.index)
collectionRouter.get('/:identifier', Auth, GetCollectionRequest.getCollection, CollectionController.get)
collectionRouter.get('/:identifier/resources', Auth, GetCollectionResourcesRequest.getCollectionResources, CollectionController.get)
collectionRouter.post('/:identifier/update', Auth, UpdateCollectionRequest.updateCollection, CollectionController.update)

export default collectionRouter;