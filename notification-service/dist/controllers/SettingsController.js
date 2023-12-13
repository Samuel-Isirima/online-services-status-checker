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
exports.updateSettings = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const RequestValidator_1 = __importDefault(require("../helpers/RequestValidator"));
const Profile_1 = __importDefault(require("../models/Profile"));
exports.updateSettings = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var profile = null;
    const validationRule = {
        "theme": "required|string|min:4",
        "language": "required|string|min:4",
        "communication_channels": "required|string|min:3",
        "allow_ai_to_analyse_my_data": "required|boolean",
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
    profile = yield Profile_1.default.findOne({ user_id: user_id });
    if (!profile) {
        return res.status(401).send({ message: `Profile not found.` });
    }
    //Now update the settings
    profile.theme = req.body.theme;
    profile.language = req.body.language;
    profile.communication_channels = req.body.communication_channels;
    profile.allow_ai_to_analyse_my_data = req.body.allow_ai_to_analyse_my_data;
    profile = yield profile.save();
    if (!profile) {
        return res.status(401).send({ message: `Settings update failed.` });
    }
    return res.status(200).send({ message: `Settings updated successful.` });
}));
