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
exports.createResource = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const RequestValidator_1 = __importDefault(require("../../helpers/RequestValidator"));
exports.createResource = (body_parser_1.default.urlencoded(), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const validationRule = {
        "name": "required|string|min:4",
        "tags": "string",
        "type": "required|string",
        "description": "string",
        "url": "required|string",
        "collection_id": "string",
        "display_image_url": "string"
    };
    const validationResult = yield (0, RequestValidator_1.default)(req.body, validationRule, {})
        .catch((err) => {
        console.log('Error occurred while validating the request body');
        console.error(err);
    });
    if (validationResult.status === false) {
        console.log('Validation failed');
        const errorMessages = validationResult.formattedErrors;
        return res.status(401).send({ message: `${errorMessages[0]}` });
    }
    //call the next middleware
    next();
}));
