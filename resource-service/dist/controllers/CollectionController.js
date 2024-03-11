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
const Collection_1 = __importDefault(require("../models/Collection"));
const RandomStringGenerator_1 = require("../utils/RandomStringGenerator");
exports.index = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collections = yield Collection_1.default.find({ user_id: req.user.id });
    if (!collections) {
        return res.status(401).send({ message: `No collections found.` });
    }
    return res.status(200).send({ message: `Collections retrieved successfully.`, collections: collections });
}));
exports.create = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var collection = null;
    // Get the user from the request object
    const user_ = req.user;
    const user_id = user_.id;
    //now check if a resource with the same name exists
    collection = yield Collection_1.default.findOne({
        name: req.body.name,
        user_id: user_id,
    });
    if (collection) {
        return res.status(401).send({ message: `Collection with this name already exists.` });
    }
    const unique_id = (0, RandomStringGenerator_1.generateRandomString)(30).toLowerCase();
    //Now create a new collection
    collection = yield Collection_1.default.create({
        user_id: user_id,
        name: req.body.name,
        unique_id: unique_id,
        tags: req.body.tags,
        description: req.body.description,
        display_image_url: req.body.display_image_url
    });
    return res.status(200).send({ message: `Collection created successfully.`, collection: collection });
}));
exports.get = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield Collection_1.default.findOne({ unique_id: req.params.identifier, user_id: req.user.id });
    if (!collection) {
        return res.status(401).send({ message: `Collection not found.` });
    }
    return res.status(200).send({ message: `Collection retrieved successfully.`, collection: collection });
}));
exports.update = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const collection = yield Collection_1.default.findOne({ unique_id: req.params.identifier, user_id: req.user.id });
    if (!collection) {
        return res.status(401).send({ message: `Collection not found.` });
    }
    //make sure there is no other collection with the same name
    const collection_ = yield Collection_1.default.findOne({ name: req.body.name, user_id: req.user.id });
    if (collection_ && collection_.unique_id !== req.params.identifier) {
        return res.status(401).send({ message: `Collection with this name already exists.` });
    }
    //Now update the collection
    collection.name = req.body.name;
    collection.description = req.body.description;
    collection.display_image_url = req.body.display_image_url;
    collection.tags = req.body.tags;
    //save the collection
    yield collection.save();
    return res.status(200).send({ message: `Collection updated successfully.`, collection: collection });
}));
