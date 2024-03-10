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
const bcrypt_1 = __importDefault(require("bcrypt"));
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const User_1 = __importDefault(require("../models/User"));
exports.changePassword = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    // Get the user from the request object
    const user_ = req.user;
    //Now find the user from the database
    user = yield User_1.default.findById(user_.id);
    if (!user) {
        return res.status(401).send({ message: `User not found.` });
    }
    // Get the old password, password and confirm password from the request body
    const { old_password, password, confirm_password } = req.body;
    // Check if the old password matches the one in the database
    if (!(yield bcrypt_1.default.compare(old_password, user.password))) {
        return res.status(401).send({ message: `Invalid old password.` });
    }
    // Check if the password and confirm password match
    if (password !== confirm_password) {
        return res.status(401).send({ message: `Password and confirm password do not match.` });
    }
    // Hash the password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    // Update the password
    user.password = hashedPassword;
    // Save the user to the database
    yield user.save();
    //Send password change mail
    return res.status(200).send({ message: `Password change successful.` });
}));
