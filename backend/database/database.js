import mongoose from 'mongoose';

import dotenv from "dotenv"
//config

dotenv.config({path:"backend/config/config.env"});

const connectDB = async () => {
  try {
    const data = await mongoose.connect('mongodb+srv://divyam20233121:divyam63@cluster1.v0dem.mongodb.net/'
      , {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${data.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
