//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import Request, { IRequest } from "./ResourceRequest";
import Action from "./Action";
import Resource from "./Resource";

export interface ICollection extends Document {
  user_id: String;
  name: String;
  unique_id: String;
  tags: String;
  description: String;
  display_image_url: String;
}


//create Collection schema
const collectionSchema = new Schema<ICollection>(
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
    description: {
      type: String,
      required: false,
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

//Add a getRequests method to the collectionSchema
// collectionSchema.methods.getResources = async function () {
//   const resources = await Resource.find({ collection_id: this._id });
//   return resources;
// };


const Collection: Model<ICollection> = mongoose.model('collections', collectionSchema)//, 'collection_service_database');

export default Collection;

