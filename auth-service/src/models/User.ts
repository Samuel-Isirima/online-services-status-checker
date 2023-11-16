//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  email: String;
  password: String;
  comparePassword: (password: String) => Promise<boolean>;
  unique_id: String;
  email_verified_at: Date;
}


const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: { type: String, required: true },
    unique_id: { type: String, required: true, unique: true },
    email_verified_at: { type: Date, required: false, default: null }
  },
  {
    timestamps: true
  }
);

const User: Model<IUser> = mongoose.model('users', userSchema)//, 'auth_service_database');
export default User;


