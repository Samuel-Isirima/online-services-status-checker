//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IRequest extends Document {
  title: String;
  method: String;
  resource_id: String;
  description: String;
  body_data: Object;
  headers_data: Object;
}

//create profile schema
const RequestSchema = new Schema<IRequest>(
  {
    //correctly implement the IRequest interface
    title: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    resource_id: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    body_data: {
      type: Object,
      required: false,
    },
    headers_data: {
      type: Object,
      required: false,
    }
  },
  {
    timestamps: true
  }
);


const Profile: Model<IRequest> = mongoose.model('Requests', RequestSchema)//, 'Request_service_database');
export default Profile;

