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
exports.update = exports.get = exports.create = exports.index = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv = require('dotenv');
dotenv.config();
const Resource_1 = __importDefault(require("../models/Resource"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
const Collection_1 = __importDefault(require("../models/Collection"));
exports.index = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resources = yield Resource_1.default.find({ user_id: req.user.id });
    if (!resources) {
        return res.status(401).send({ message: `No resources found.` });
    }
    return res.status(200).send({ message: `Resources retrieved successfully.`, resources: resources });
}));
exports.create = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var resource = null;
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    const unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //First confirm if this user owns the collection
    var collection = null;
    console.log('These are the params', req.body);
    collection = yield Collection_1.default.findOne({
        unique_id: req.body.collection_identifier,
        user_id: user_id
    });
    if (!collection) {
        return res.status(401).send({ message: `Collection not found.` });
    }
    //now check if a resource with the same name exists
    resource = yield Resource_1.default.findOne({
        name: req.body.name,
        collection_unique_id: req.body.collection_identifier,
    });
    if (resource) {
        return res.status(401).send({ message: `Resource with this name already exists.` });
    }
    //Now create a new resource
    resource = yield Resource_1.default.create({
        user_id: user_id,
        name: req.body.name,
        unique_id: unique_id,
        tags: req.body.tags,
        type: req.body.type,
        description: req.body.description,
        url: req.body.url,
        collection_unique_id: req.body.collection_identifier,
    });
    return res.status(200).send({ message: `Resource created successfully.`, resource: resource });
}));
exports.get = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield Resource_1.default.findOne({ unique_id: req.params.identifier, user_id: req.user.id });
    if (!resource) {
        return res.status(401).send({ message: `Resource not found.` });
    }
    return res.status(200).send({ message: `Resource retrieved successfully.`, resource: resource });
}));
exports.update = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const resource = yield Resource_1.default.findOne({ unique_id: req.params.identifier });
    if (!resource) {
        return res.status(401).send({ message: `Resource not found.` });
    }
    //make sure there is no other resource with the same name
    const resource_ = yield Resource_1.default.findOne({ name: req.body.name, collection_unique_id: resource.collection_unique_id });
    if (resource_ && resource_.unique_id !== req.params.identifier) {
        return res.status(401).send({ message: `Resource with this name already exists.` });
    }
    //Now update the resource
    resource.name = req.body.name;
    resource.description = req.body.description;
    resource.url = req.body.url;
    resource.display_image_url = req.body.display_image_url;
    //save the resource
    yield resource.save();
    return res.status(200).send({ message: `Resource updated successfully.`, resource: resource });
}));
