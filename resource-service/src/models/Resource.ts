//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IResource extends Document {
  name: String;
  unique_id: String;
  tags: String;
  type: String;
  description: String;
  url: String;
  project: String;
}

//create profile schema
const resourceSchema = new Schema<IResource>(
  {
    //correctly implement the IResource interface
    name: {
      type: String,
      required: true,
    },
    unique_id: {
      type: String,
      required: true,
    },
    tags: {
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
    },
    url: {
      type: String,
      required: true,
    },
    project: {
      type: String,
      required: false,
    },

  },
  {
    timestamps: true
  }
);


const Profile: Model<IResource> = mongoose.model('resources', resourceSchema)//, 'resource_service_database');
export default Profile;

