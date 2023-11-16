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
exports.changePassword = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const Auth_1 = require("../middleware/Auth");
exports.changePassword = (body_parser_1.default.urlencoded(), Auth_1.Auth, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var user = null;
    const validationRule = {
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
    //Get request authorization token
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
        return res.status(401).send({ message: `You need to be logged in to change your password.` });
    }
    const token = authorizationHeader.split(' ')[1];
    // if(!token)
    // {
    //   return res.status(401).send({ message: `You need to be logged in to change your password.`})
    // }
    // //Get user id from token
    // if(!user)
    // {
    // return res.status(401).send({ message: `Email does not exist.`})
    // }
    // //check if passwords match
    // if(req.body.password !== req.body.confirm_password)
    // {
    // return res.status(401).send({ message: `Passwords do not match.`})
    // }
    // //update user
    // var password: String = req.body.password
    // var saltRounds: number = 10
    // var hashed_password: String = await bcrypt.hash(password, saltRounds)
    // user.password = hashed_password
    // await user.save()
    // //return token
    return res.status(200).send({ message: `Password change successful.` });
}));
