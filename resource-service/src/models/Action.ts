//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IAction extends Document {
  resource_id: String;
  unique_id: String;
  type: String;
  description: String;
}

//create profile schema
const ActionSchema = new Schema<IAction>(
  {
    //correctly implement the IAction interface
    resource_id: {
      type: String,
      required: true,
    },
    unique_id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);


const Action: Model<IAction> = mongoose.model('Actions', ActionSchema)//, 'Action_service_database');
export default Action;

