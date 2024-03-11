"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const collection_1 = __importDefault(require("./collection"));
const resource_1 = __importDefault(require("./resource"));
const request_1 = __importDefault(require("./request"));
const router = (0, express_1.Router)();
router.use('/resource/collection', collection_1.default);
router.use('/resource', resource_1.default);
router.use('/resource/request', request_1.default);
exports.default = router;
