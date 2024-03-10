"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
//create InterestedResponse model for mongodb
/**
 * This response class is the one that is created by the user to capture particular types/classes
 * of HTTP responses from their resources
 */
const mongoose_1 = __importStar(require("mongoose"));
const Action_1 = __importDefault(require("./Action"));
//create InterestedResponse schema
const InterestedResponseSchema = new mongoose_1.Schema({
    //correctly implement the IInterestedResponse interface
    unique_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    request_id: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    http_status_code: {
        type: String,
        required: true,
    },
    http_status_code_range: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
//Add getActions method to the InterestedResponseSchema
InterestedResponseSchema.methods.getActions = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const actions = yield Action_1.default.find({ interested_response_id: this._id });
        return actions;
    });
};
const InterestedResponse = mongoose_1.default.model('interested_responses', InterestedResponseSchema); //, 'InterestedResponse_service_database');
exports.default = InterestedResponse;
