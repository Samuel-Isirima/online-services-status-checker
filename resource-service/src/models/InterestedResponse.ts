//create InterestedResponse model for mongodb
/**
 * This response class is the one that is created by the user to capture particular types/classes
 * of HTTP responses from their resources
 */
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import Action from "./Action";

export interface IInterestedResponse extends Document {
  unique_id: String;
  title: String;
  description: String;
  request_unique_id: String;
  category: String;     //Specific code response or code range
  http_status_code?: String;
  http_status_code_range?: String;
}

//create InterestedResponse schema
const InterestedResponseSchema = new Schema<IInterestedResponse>(
  {
    //correctly implement the IInterestedResponse interface
    unique_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    request_unique_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    http_status_code: {
      type: String,
      required: false,
    },
    http_status_code_range: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true
  }
);

//Add getActions method to the InterestedResponseSchema
InterestedResponseSchema.methods.getActions = async function () {
  const actions = await Action.find({ interested_response_id: this._id });
  return actions;
};

const InterestedResponse: Model<IInterestedResponse> = mongoose.model('interested_responses', InterestedResponseSchema)//, 'InterestedResponse_service_database');
export default InterestedResponse;

