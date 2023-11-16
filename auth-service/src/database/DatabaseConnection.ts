import mongoose, { connect } from "mongoose";
require('dotenv').config();

const connectToDatabase = async () => {

  const mongoURI = process.env.AUTH_SERVICE_DATABASE_MONGO_URI || 'mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.0.2';

  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to the Auth Service MongoDB database');
  } catch (error) {
    console.error('Error connecting to the Auth Service database:', error);
  }
};

export default connectToDatabase;