import mongoose from "mongoose";
import { DB_NAME } from '../constant.js';

// Connect to MongoDB

const connectDB = async () => {
  const connectionInstense = await mongoose.connect(`${process.env.MONGODB_DATABASE_URI}/${DB_NAME}`)
  console.log(`MongoDB Connected Successfully on Host: ${connectionInstense.connection.host}`)
}

export default connectDB;