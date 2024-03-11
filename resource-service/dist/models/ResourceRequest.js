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
//create user model for mongodb
const mongoose_1 = __importStar(require("mongoose"));
const InterestedResponse_1 = __importDefault(require("./InterestedResponse"));
const Resource_1 = __importDefault(require("./Resource"));
//create Request schema
const RequestSchema = new mongoose_1.Schema({
    //correctly implement the IRequest interface
    unique_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    resource_unique_id: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    body_data: {
        type: Object,
        required: false,
    },
    headers_data: {
        type: Object,
        required: false,
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});
//Add a getRequests method to the resourceSchema
RequestSchema.methods.getResponses = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const responses = yield InterestedResponse_1.default.find({ request_id: this._id });
        return responses;
    });
};
//Add a getResource method to the RequestSchema
RequestSchema.methods.getResource = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const resource = yield Resource_1.default.findOne({ _id: this.resource_unique_id });
        return resource;
    });
};
const Request = mongoose_1.default.model('requests', RequestSchema); //, 'Request_service_database');
exports.default = Request;
