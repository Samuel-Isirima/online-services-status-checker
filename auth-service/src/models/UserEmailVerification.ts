//create email verification model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { Timestamp } from "mongodb";

export interface IUserEmailVerification extends Document {
    email: String;
    token: String;
    expires_at: Date;
    valid: boolean;
}

const userEmailVerificationSchema = new Schema<IUserEmailVerification>(
  {
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
  },
  {
    timestamps: true
  }
);


//export email verification model
const UserEmailVerification: Model<IUserEmailVerification> = mongoose.model('users_email_verification', userEmailVerificationSchema)//, 'auth_service_database');
export default UserEmailVerification;