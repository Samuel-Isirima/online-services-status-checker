//create email verification model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import { Timestamp } from "mongodb";

export interface ISettings extends Document {
  theme: String;    //Dark or light
  language: String; //English or French
  communcation_channels: String; //Email, phone
  allow_ai_to_analyse_my_data: Boolean;

}

const settingsSchema = new Schema<ISettings>(
  {
    theme: {
      type: String,
      required: true,
      default: "light",
    },
    language: {
      type: String,
      required: true,
      default: "English",
    },
    communcation_channels: {
      type: String,
      required: true,
      default: "Email",
    },
    allow_ai_to_analyse_my_data: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true
  }
);


export default mongoose.model<ISettings>("Settings", settingsSchema);