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
const dotenv = require('dotenv');
dotenv.config();
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
const Action_1 = __importDefault(require("../models/Action"));
exports.index = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const actions = yield Action_1.default.find({ request_id: req.params.interested_response });
    if (!actions) {
        return res.status(401).send({ message: `No Actions found for this request.` });
    }
    return res.status(200).send({ message: `Actions retrieved successfully.`, actions: actions });
}));
exports.add = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var action = null;
    const unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //Now create a new Action
    action = new Action_1.default({
        unique_id: unique_id,
        interested_response_id: req.body.interested_response_id,
        notifications_config: req.body.notifications_config,
        webhooks_config: req.body.webhooks_config,
        custom_message: req.body.custom_message,
    });
    if (!action) {
        return res.status(401).send({ message: `An unexpected error occurred while trying to create the action.` });
    }
    return res.status(200).send({ message: `Action created successfully.`, action: action });
}));
exports.get = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const action = yield Action_1.default.findOne({ unique_id: req.params.unique_id });
    if (!action) {
        return res.status(401).send({ message: `Action not found.` });
    }
    return res.status(200).send({ message: `Action retrieved successfully.`, action: action });
}));
exports.update = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const action = yield Action_1.default.findOne({ unique_id: req.params.unique_id });
    if (!action) {
        return res.status(401).send({ message: `Action not found.` });
    }
    //Now update the Request
    action.custom_message = req.body.custom_message;
    action.notifications_config = req.body.notifications_config;
    action.webhooks_config = req.body.webhooks_config;
    //save the Action
    yield action.save();
    return res.status(200).send({ message: `Action updated successfully.`, action: action });
}));
