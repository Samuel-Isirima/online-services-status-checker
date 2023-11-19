//create user model for mongodb
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

export interface IEvent extends Document {
  resource_id: String;
  unique_id: String;
  type: String;
  description: String;
}

//create profile schema
const EventSchema = new Schema<IEvent>(
  {
    //correctly implement the IEvent interface
    resource_id: {
      type: String,
      required: true,
    },
    unique_id: {
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
    }
  },
  {
    timestamps: true
  }
);


const Event: Model<IEvent> = mongoose.model('Events', EventSchema)//, 'Event_service_database');
export default Event;

