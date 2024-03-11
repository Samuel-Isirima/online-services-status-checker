//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import Response from "./InterestedResponse";
import Resource from "./Resource";

export interface IResourceRequest extends Document {
  unique_id: String;
  title: String;
  method: String;
  resource_unique_id: String;
  description: String;
  body_data: Object;
  headers_data: Object;
  active: Boolean;
}

//create Request schema
const ResourceRequestSchema = new Schema<IResourceRequest>(
  {
    //correctly implement the IRequest interface
    unique_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    resource_unique_id: {
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
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);


// //Add a getRequests method to the resourceSchema
// ResourceRequestSchema.methods.getResponses = async function () {
//   const responses = await Response.find({ request_id: this._id });
//   return responses;
// };

// //Add a getResource method to the RequestSchema
// ResourceRequestSchema.methods.getResource = async function () {
//   const resource = await Resource.findOne({ _id: this.resource_unique_id });
//   return resource;
// };

const ResourceRequest: Model<IResourceRequest> = mongoose.model('resource_requests', ResourceRequestSchema)//, 'Request_service_database');
export default ResourceRequest;

