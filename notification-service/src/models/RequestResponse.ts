//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IRequestResponse extends Document {
  request_id: String;
  http_status_code: String;
  response_body: Object;
  response_headers: Object;
  response_time: Number;
}

//create profile schema
const RequestResponseSchema = new Schema<IRequestResponse>(
  {
    request_id: {
      type: String,
      required: true,
    },
    response_body: {
      type: Object,
      required: false,
    },
    response_headers: {
      type: Object,
      required: false,
    },
    http_status_code: {
      type: String,
      required: true,
    },
    response_time: {
      type: Number,
      required: true,
    }
  },
  {
    timestamps: true
  }
);


const RequestResponse: Model<IRequestResponse> = mongoose.model('Responses', RequestResponseSchema)//, 'Response_service_database');
export default RequestResponse;

