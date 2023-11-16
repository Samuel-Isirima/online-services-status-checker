"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//create email verification model for mongodb
const mongoose_1 = require("mongoose");
const emailVerificationSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    token: { type: String, required: true },
    expires_at: { type: Date, required: true },
    valid: { type: Boolean, required: true, default: true }
}, {
    timestamps: true
});
//export email verification model
exports.default = (0, mongoose_1.model)("email_verification", emailVerificationSchema);
