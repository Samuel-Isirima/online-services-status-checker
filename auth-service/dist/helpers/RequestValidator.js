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
const validatorjs_1 = __importDefault(require("validatorjs"));
const RequestValidator = (body, rules, customMessages) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const validation = new validatorjs_1.default(body, rules, customMessages);
        validation.passes(() => resolve({ status: true }));
        validation.fails(() => resolve({ status: false, errors: validation.errors, formattedErrors: extractValidationErrorMessages(validation.errors) })); // Resolve with false in case of validation failure
    });
});
function extractValidationErrorMessages(errors) {
    const errorMessages = [];
    errors = errors.errors;
    for (const field in errors) {
        if (Array.isArray(errors[field])) {
            errorMessages.push(...errors[field]);
        }
    }
    return errorMessages;
}
exports.default = RequestValidator;
