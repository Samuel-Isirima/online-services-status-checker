//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import InterestedResponse from "./InterestedResponse";

export interface IAction extends Document {
    unique_id: String;
    response_id: String;
    notifications_config: Object;
    webhooks_config: Object;
    interested_response_id: String;
}

//create profile schema
const ActionSchema = new Schema<IAction>(
  {
    //correctly implement the IAction interface
    unique_id: {
      type: String,
      required: true,
    },
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
    },
    interested_response_id: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true
  }
);

//Add a getResponse method to the resourceSchema
ActionSchema.methods.getResponse = async function () {
const response = await InterestedResponse.findOne({ _id: this.response_id });
return response;
}

const Action: Model<IAction> = mongoose.model('actions', ActionSchema)//, 'Action_service_database');
export default Action;

