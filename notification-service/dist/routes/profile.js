"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../middleware/Auth");
const FileUploader_1 = __importDefault(require("../helpers/FileUploader"));
const dotenv = require('dotenv');
dotenv.config();
const DetailsController = require('../controllers/DetailsController');
const SettingsController = require('../controllers/SettingsController');
const KYCController = require('../controllers/KYCController');
const profileRouter = (0, express_1.Router)();
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
profileRouter.post('/create', Auth_1.Auth, DetailsController.create);
profileRouter.post('/details/update/profile-picture', Auth_1.Auth, FileUploader_1.default.single('profile_picture'), DetailsController.updateProfilePicture);
profileRouter.post('/details/update/occupation', Auth_1.Auth, DetailsController.updateOccupation);
// /////////////////////////////////////////////////////////For AI purposes///////////////////////////////////////////////////////////
profileRouter.post('/details/update/monthly-income', Auth_1.Auth, DetailsController.updateMonthlyIncome);
profileRouter.get('/detals/update/ftystmmo', Auth_1.Auth, DetailsController.updateFiveThingsYouSpendTheMostMoneyOn);
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
profileRouter.post('/update/settings', Auth_1.Auth, SettingsController.updateSettings);
// profileRouter.post('/kyc/update/ID', Auth, uploadKYCID.single('ID'), KYCController.uploadID)
// profileRouter.post('/kyc/update/POR', Auth, KYCController.changePassword)
exports.default = profileRouter;
