//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IResponse extends Document {
  title: String;
  request_id: String;
  category: String;     //Specific code response or code range
  http_status_code: String;
  http_status_code_range: String;
  response_body: Object;
  response_headers: Object;
  response_time: Number;
}

//create profile schema
const ResponseSchema = new Schema<IResponse>(
  {
    //correctly implement the IResponse interface
    title: {
      type: String,
      required: true,
    },
    request_id: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    http_status_code: {
      type: String,
      required: true,
    },
    http_status_code_range: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true
  }
);


const Profile: Model<IResponse> = mongoose.model('Responses', ResponseSchema)//, 'Response_service_database');
export default Profile;

