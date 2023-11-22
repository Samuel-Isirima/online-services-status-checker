//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IAction extends Document {
    resource_id: String;
    responses_ids: Object;   //An array of responses for which this action is applicable
    notifications_config: Object;
    webhooks_config: Object;
}

//create profile schema
const ActionSchema = new Schema<IAction>(
  {
    //correctly implement the IAction interface
    resource_id: {
      type: String,
      required: true,
    },
    responses_ids: {
      type: Object,
      required: false,
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

