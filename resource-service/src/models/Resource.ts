//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import Request, { IRequest } from "./ResourceRequest";
import Action from "./Action";

export interface IResource extends Document {
  user_id: String;
  name: String;
  unique_id: String;
  tags: String;
  type: String;   //Web page, api endpoint, image, video, etc
  description: String;
  url: String;
  collection_unique_id: String;     //Basically a collection ID
  display_image_url: String;

}


//create Resource schema
const resourceSchema = new Schema<IResource>(
  {
    //correctly implement the IResource interface
    user_id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    unique_id: {
      type: String,
      required: false,
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

    collection_unique_id: {
      type: String,
      required: true,
    },
    display_image_url: {
      type: String,
      required: false,
    }

  },
  {
    timestamps: true
  }
);

//Add a getRequests method to the resourceSchema
resourceSchema.methods.getRequests = async function () {
  const requests = await Request.find({ resource_id: this._id });
  return requests;
};


const Resource: Model<IResource> = mongoose.model('resources', resourceSchema)//, 'resource_service_database');

export default Resource;

