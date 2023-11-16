//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IProfile extends Document {
  user_id: String;
  tag?: String;
  unique_id: String;
  phone?: String;
  sex: String;
  dob: String;
  profile_picture: String;
  occupation?: String;
  country: String;
  nationality?: String;
  monthly_income?: String;
  five_things_you_spend_the_most_money_on?: String;
  kyc_status: String;
  kyc_id?: String;
  kyc_id_upload_date?: Date;
  kyc_por?: String;
  kyc_por_upload_date?: Date;
  theme?: String;    //Dark or light
  language?: String; //English or French
  communication_channels?: String; //Email, phone
  allow_ai_to_analyse_my_data?: Boolean;

}

//create profile schema
const profileSchema = new Schema<IProfile>(
  {
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
    kyc_status: { type: String, required: true, default: "unverified" },
    kyc_id: { type: String, required: false },
    kyc_id_upload_date: { type: Date, required: false },
    kyc_por: { type: String, required: false },
    kyc_por_upload_date: { type: Date, required: false },
    theme: { type: String, required: false, default: "light" },
    language: { type: String, required: false, default: "English" },
    communication_channels: { type: String, required: false, default: "Email" },
    allow_ai_to_analyse_my_data: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: true
  }
);


const Profile: Model<IProfile> = mongoose.model('profiles', profileSchema)//, 'profile_service_database');
export default Profile;

