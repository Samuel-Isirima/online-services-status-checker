//create userr password recovery model for mongodb
import { Schema, Document, model } from "mongoose";
import bcrypt from "bcrypt";
import { Timestamp } from "mongodb";

export interface IPasswordRecovery extends Document {
    email: String;
    token: String;
    expires: Date;
    valid: boolean;
}

const passwordRecoverySchema = new Schema(
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

//export password recovery model
export default model<IPasswordRecovery>("password_recovery", passwordRecoverySchema);

