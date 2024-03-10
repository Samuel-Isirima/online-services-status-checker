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
Object.defineProperty(exports, "__esModule", { value: true });
//create user model for mongodb
const mongoose_1 = __importStar(require("mongoose"));
//create Collection schema
const collectionSchema = new mongoose_1.Schema({
    //correctly implement the IResource interface
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    unique_id: {
        type: String,
        required: false,
    },
    tags: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    display_image_url: {
        type: String,
        required: false,
    }
}, {
    timestamps: true
});
//Add a getRequests method to the collectionSchema
// collectionSchema.methods.getResources = async function () {
//   const resources = await Resource.find({ collection_id: this._id });
//   return resources;
// };
const Collection = mongoose_1.default.model('collections', collectionSchema); //, 'collection_service_database');
exports.default = Collection;
