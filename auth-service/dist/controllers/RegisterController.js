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
exports.register = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const User_1 = __importDefault(require("../models/User"));
const UserEmailVerification_1 = __importDefault(require("../models/UserEmailVerification"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
exports.register = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var user = null;
    const validationRule = {
        "email": "required|string|email",
        "first_name": "required|string",
        "last_name": "required|string",
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
    //check if passwords match
    if (req.body.password !== req.body.confirm_password) {
        return res.status(401).send({ message: `Passwords do not match.` });
    }
    //check if email already exists
    user = yield User_1.default.findOne({ email: req.body.email });
    if (user) {
        return res.status(401).send({ message: `Email already exists.` });
    }
    const payload = req.body;
    try {
        var password = payload.password;
        var saltRounds = 10;
        var hashed_password = yield bcrypt_1.default.hash(password, saltRounds);
        payload.password = hashed_password;
        var unique_id = (0, RandomStringGenerator_1.generateRandomString)(32);
        //create user
        user = yield User_1.default.create({
            email: payload.email,
            password: payload.password,
            unique_id: unique_id
        });
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
    }
    catch (error) {
        console.log(error);
        return res.status(403).send({ message: `An unexpected error has occured. Please try again later.`,
            error: error });
    }
    return res.status(200).send({ message: `Account created successfully. Welcome to the ORSM API!` });
}));
