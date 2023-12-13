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
//create profile schema
const profileSchema = new mongoose_1.Schema({
    //correctly implement the IProfile interface
    user_id: { type: String, required: true, unique: true },
    tag: { type: String, required: true, unique: true },
    unique_id: { type: String, required: true },
    phone: { type: String, required: false },
    sex: { type: String, required: false },
    dob: { type: String, required: false },
    profile_picture: { type: String, required: false },
    occupation: { type: String, required: false },
    country: { type: String, required: true },
    nationality: { type: String, required: true },
    monthly_income: { type: String, required: false },
    five_things_you_spend_the_most_money_on: { type: String, required: false },
    KYC_status: { type: String, required: true, default: "unverified" },
    theme: { type: String, required: false, default: "light" },
    language: { type: String, required: false, default: "English" },
    communication_channels: { type: String, required: false, default: "Email" },
    allow_ai_to_analyse_my_data: { type: Boolean, required: false, default: false },
}, {
    timestamps: true
});
const Profile = mongoose_1.default.model('profiles', profileSchema); //, 'profile_service_database');
exports.default = Profile;
