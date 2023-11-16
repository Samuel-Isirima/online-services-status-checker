import { Router, Request, Response, NextFunction} from 'express'
import { Auth } from '../middleware/Auth';
import { uploadKYCID, uploadKYCPOR, uploadProfilePicture } from '../helpers/FileUploader';
import Profile, { IProfile } from '../models/Profile';
const dotenv = require('dotenv');
dotenv.config();
const DetailsController = require('../controllers/DetailsController');
const SettingsController = require('../controllers/SettingsController');

const profileRouter: Router = Router()

/**
 * Tag  U
 * DOB  S   
 * Sex  S
 * Profile picture  U
 * Occupation   U
 * Phone    S
 * Country  S
 * Nationality  S
 * 
 * for AI purposes
 * Monthly income   U
 * 5 things you spend the most money on U
 * 
 * for verification purposes
 * ID
 * Proof of residence
 * 
 * Details marked for update can be updated by the user anytime they want
 * but details marked for set can only be set once and cannot be changed
 */

profileRouter.post('/create', Auth, DetailsController.create)
profileRouter.get('/details', Auth, DetailsController.get)
profileRouter.post('/details/update/profile-picture', Auth, uploadProfilePicture.single('profile_picture'),  DetailsController.updateProfilePicture)
profileRouter.post('/details/update/occupation', Auth, DetailsController.updateOccupation)

// /////////////////////////////////////////////////////////For AI purposes///////////////////////////////////////////////////////////

profileRouter.post('/details/update/monthly-income', Auth, DetailsController.updateMonthlyIncome)   
profileRouter.get('/detals/update/ftystmmo', Auth, DetailsController.updateFiveThingsYouSpendTheMostMoneyOn)

// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

profileRouter.post('/update/settings', Auth, SettingsController.updateSettings)


export default profileRouter;