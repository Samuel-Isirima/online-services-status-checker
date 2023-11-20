//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IAction extends Document {
    response_id: String;
    notifications_config: Object;
    webhooks_config: Object;
}

//create profile schema
const ActionSchema = new Schema<IAction>(
  {
    //correctly implement the IAction interface
    response_id: {
      type: String,
      required: true,
    },
    notifications_config: {
      type: Object,
      required: false,
    },
    webhooks_config: {
      type: Object,
      required: false,
    }
  },
  {
    timestamps: true
  }
);


const Action: Model<IAction> = mongoose.model('Actions', ActionSchema)//, 'Action_service_database');
export default Action;

