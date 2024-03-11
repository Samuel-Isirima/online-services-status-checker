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
exports.updateActiveness = exports.update = exports.get = exports.add = exports.index = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const ResourceRequest_1 = __importDefault(require("../models/ResourceRequest"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
exports.index = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const requests = yield ResourceRequest_1.default.find({ resource_unique_id: req.params.resource_identifier });
    if (!requests) {
        return res.status(401).send({ message: `No Requests found.` });
    }
    return res.status(200).send({ message: `Requests retrieved successfully.`, requests: requests });
}));
exports.add = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var request = null;
    const unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //Now create a new Request
    request = new ResourceRequest_1.default({
        title: req.body.title,
        method: req.body.method,
        resource_unique_id: req.body.resource_unique_id,
        description: req.body.description,
        body_data: req.body.body_data,
        headers_data: req.body.headers_data,
        unique_id: unique_id,
    });
    if (!request) {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the Request.` });
    }
    return res.status(200).send({ message: `Request created successfully.`, request: request });
}));
exports.get = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield ResourceRequest_1.default.findOne({ unique_id: req.params.unique_id });
    if (!request) {
        return res.status(401).send({ message: `Request not found.` });
    }
    return res.status(200).send({ message: `Request retrieved successfully.`, request: request });
}));
exports.update = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield ResourceRequest_1.default.findOne({ unique_id: req.params.unique_id });
    if (!request) {
        return res.status(401).send({ message: `Request not found.` });
    }
    //Now update the Request
    request.title = req.body.title;
    request.method = req.body.method;
    request.description = req.body.description;
    request.body_data = req.body.body_data;
    request.headers_data = req.body.headers_data;
    //save the Request
    yield request.save();
    return res.status(200).send({ message: `Request updated successfully.`, request: request });
}));
exports.updateActiveness = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield ResourceRequest_1.default.findOne({ unique_id: req.params.resource_request_unique_id });
    if (!request) {
        return res.status(401).send({ message: `Request not found.` });
    }
    //Now update the Request
    request.active = req.body.active;
    //save the Request
    yield request.save();
    return res.status(200).send({ message: `Request status updated successfully.`, request: request });
}));
