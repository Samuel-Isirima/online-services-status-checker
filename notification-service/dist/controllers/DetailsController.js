"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFiveThingsYouSpendTheMostMoneyOn = exports.updateMonthlyIncome = exports.updateOccupation = exports.updateProfilePicture = exports.create = exports.updateTag = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const Profile_1 = __importDefault(require("../models/Profile"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
exports.updateTag = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        "tag": "required|string|min:4",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //Now check to see if any other profile has the same tag
    profile = yield Profile_1.default.findOne({ tag: req.body.tag });
    if (profile) {
        return res.status(401).send({ message: `Tag already in use by another account.` });
    }
    //If not, update the tag
    profile = yield Profile_1.default.findOneAndUpdate({ user_id: user_id }, { tag: req.body.tag });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    return res.status(200).send({ message: `Tag change successful.` });
}));
exports.create = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Details are;
     * DOB, sex, country, nationality, phone
     *
     */
    var profile = null;
    const validationRule = {
        'dob': 'date',
        "sex": "required|string",
        "country": "required|string",
        "nationality": "required|string",
        "phone": "required|string",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //Now update the profile based on the user id
    profile = yield Profile_1.default.findOne({ user_id: user_id });
    if (profile) {
        return res.status(401).send({ message: `Profile already exists.` });
    }
    //Now create a new profile
    profile = new Profile_1.default();
    profile.user_id = user_id;
    //Now update the profile
    profile.dob = req.body.dob;
    profile.sex = req.body.sex;
    profile.country = req.body.country;
    profile.nationality = req.body.nationality;
    profile.phone = req.body.phone;
    profile.tag = (0, RandomStringGenerator_1.generateRandomString)(8).toLowerCase();
    profile.unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //Now save the profile
    yield profile.save();
    return res.status(200).send({ message: `Profile created successfully.` });
}));
exports.updateProfilePicture = ((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        'profile_picture': 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    };
    if (!req.file) {
        return res.status(401).send({ message: `No file uploaded.` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    profile = yield Profile_1.default.findOne({ user_id: user_id });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    const { originalname, path } = req.file;
    console.log('PICTURE PATH: ' + path);
    console.log('PICTURE PATH 2: ' + profile.profile_picture);
    //Delete the old profile picture
    if (profile.profile_picture) {
        try {
            const oldProfilePicture = profile.profile_picture;
            const fs = require('fs');
            fs.unlinkSync(oldProfilePicture); //This is not asynchronous, good enough. I don't think deleting a profile pic should be 
            //a non blocking operation
        }
        catch (error) {
            console.log(error);
        }
    }
    else {
        //LOG THIS
    }
    //Now update the profile
    profile.profile_picture = path;
    profile.save();
    return res.status(200).send({ message: `Profile photo uploaded successfully.` });
}));
exports.updateOccupation = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        "occupation": "required|string|min:8",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //If not, update the tag
    profile = yield Profile_1.default.findOneAndUpdate({ user_id: user_id }, { occupation: req.body.occupation });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    return res.status(200).send({ message: `Occupation changed successfully.` });
}));
exports.updateMonthlyIncome = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        "monthly_income": "required|string|min:2",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //If not, update the tag
    profile = yield Profile_1.default.findOneAndUpdate({ user_id: user_id }, { monthly_income: req.body.occupation });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    return res.status(200).send({ message: `Monthly income changed successfully.` });
}));
exports.updateFiveThingsYouSpendTheMostMoneyOn = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        "ftystmmo": "required|string|min:15",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //If not, update the tag
    profile = yield Profile_1.default.findOneAndUpdate({ user_id: user_id }, { ftystmmo: req.body.ftystmmo });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    return res.status(200).send({ message: `Updated successfully.` });
}));
