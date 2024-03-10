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
exports.update = exports.get = exports.add = exports.index = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const InterestedResponse_1 = __importDefault(require("../models/InterestedResponse"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
const dotenv = require('dotenv');
dotenv.config();
exports.index = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const interested_responses = yield InterestedResponse_1.default.find({ request_id: req.params.request_id });
    if (!interested_responses) {
        return res.status(401).send({ message: `No responses found.` });
    }
    return res.status(200).send({ message: `Responses retrieved successfully.`, interested_responses: interested_responses });
}));
exports.add = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var interested_response = null;
    const unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //Now create a new interested_response
    interested_response = new InterestedResponse_1.default({
        unique_id: unique_id,
        title: req.body.title,
        request_id: req.body.request_id,
        category: req.body.category,
        http_status_code: req.body.http_status_code,
        http_status_code_range: req.body.http_status_code_range,
    });
    if (!interested_response) {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the response record.` });
    }
    return res.status(200).send({ message: `Response created successfully.`, response: interested_response });
}));
exports.get = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const interested_response = yield InterestedResponse_1.default.findOne({ unique_id: req.params.unique_id });
    if (!interested_response) {
        return res.status(401).send({ message: `Response not found.` });
    }
    return res.status(200).send({ message: `Response retrieved successfully.`, response: interested_response });
}));
exports.update = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const interested_response = yield InterestedResponse_1.default.findOne({ unique_id: req.params.unique_id });
    if (!interested_response) {
        return res.status(401).send({ message: `Response not found.` });
    }
    //Update the interested_response record
    interested_response.title = req.body.title;
    interested_response.description = req.body.description;
    //Save the interested_response record
    yield interested_response.save();
    return res.status(200).send({ message: `Response updated successfully.`, response: interested_response });
}));
