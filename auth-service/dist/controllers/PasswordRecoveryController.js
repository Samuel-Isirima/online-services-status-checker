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
exports.recoverPassword = exports.requestToken = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserPasswordRecovery_1 = __importDefault(require("../models/UserPasswordRecovery"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const User_1 = __importDefault(require("../models/User"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
//Create route to request password recovery
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
    //delete all previous password recoveries
    yield UserPasswordRecovery_1.default.deleteMany({ email: req.body.email });
    //create password recovery
    const token = (0, RandomStringGenerator_1.generateRandomString)(32);
    const expires_at = new Date();
    expires_at.setHours(expires_at.getHours() + 1);
    const passwordRecovery = yield UserPasswordRecovery_1.default.create({
        email: req.body.email,
        token: token,
        expires_at: expires_at
    });
    //send password recovery
    //return message  
    return res.status(200).send({ message: `Password recovery token sent.` });
}));
//Create password recovery route
exports.recoverPassword = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var user = null;
    const validationRule = {
        "email": "required|string|email",
        "token": "required|string",
        "password": "required|string|min:8",
        "confirm_password": "required|string|min:8",
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
    //check if passwords match
    if (req.body.password !== req.body.confirm_password) {
        return res.status(401).send({ message: `Passwords do not match.` });
    }
    //check if token is valid
    const token = req.body.token;
    const email = req.body.email;
    const passwordRecovery = yield UserPasswordRecovery_1.default.findOne({ email: email, token: token, valid: true });
    if (!passwordRecovery) {
        return res.status(401).send({ message: `Invalid token.` });
    }
    //update password recovery
    passwordRecovery.valid = false;
    yield passwordRecovery.save();
    //update user
    var password = req.body.password;
    var saltRounds = 10;
    var hashed_password = yield bcrypt_1.default.hash(password, saltRounds);
    user.password = hashed_password;
    yield user.save();
    //return token
    return res.status(200).send({ message: `Password recovery successful.` });
}));
