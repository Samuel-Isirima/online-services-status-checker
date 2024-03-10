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
exports.verifyEmail = exports.requestToken = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const User_1 = __importDefault(require("../models/User"));
const UserEmailVerification_1 = __importDefault(require("../models/UserEmailVerification"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
//Create route to request email verification
exports.requestToken = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var user = null;
    const validationRule = {
        "email": "required|string|email",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    //check if email already exists
    user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).send({ message: `Email does not exist.` });
    }
    //check if email is verified
    if (user.email_verified_at) {
        return res.status(401).send({ message: `Email is already verified.` });
    }
    //delete all previous email verifications
    yield UserEmailVerification_1.default.deleteMany({ email: req.body.email });
    //create email verification
    const token = (0, RandomStringGenerator_1.generateRandomString)(32);
    const expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 1);
    const emailVerification = yield UserEmailVerification_1.default.create({
        email: req.body.email,
        token: token,
        expires_at: expires_at
    });
    //send email verification
    //return message  
    return res.status(200).send({ message: `Email verification token sent.` });
}));
//Create email verification route
exports.verifyEmail = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var user = null;
    const validationRule = {
        "email": "required|string|email",
        "token": "required|string",
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `Validation failed. ${errorMessages}` });
    }
    //check if email already exists
    user = yield User_1.default.findOne({ email: req.body.email });
    if (!user) {
        return res.status(401).send({ message: `Email does not exist.` });
    }
    //check if email is verified
    if (user.email_verified_at) {
        return res.status(401).send({ message: `Email is already verified.` });
    }
    //check if token is valid
    const token = req.body.token;
    const email = req.body.email;
    const emailVerification = yield UserEmailVerification_1.default.findOne({ email: email, token: token, valid: true });
    if (!emailVerification) {
        return res.status(401).send({ message: `Invalid token.` });
    }
    //update email verification
    emailVerification.valid = false;
    yield emailVerification.save();
    //update user
    user.email_verified_at = new Date();
    yield user.save();
    //return token
    return res.status(200).send({ message: `Email verification successful.` });
}));
