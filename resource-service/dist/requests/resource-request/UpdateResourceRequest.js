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
exports.updateResource = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const RequestValidator_1 = __importDefault(require("../../helpers/RequestValidator"));
exports.updateResource = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.resource_request_unique_id) {
        return res.status(401).send({ message: `Request identifier is not specified.` });
    }
    const validationRule = {
        "method": "required|string",
        "title": "string|min:4",
        "description": "string|min:4",
        "body_data": "string",
        "header_data": "string"
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.error(err);
    });
    if (validationResult.status === false) {
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `${errorMessages[0]}` });
    }
    //call the next middleware
    next();
}));
