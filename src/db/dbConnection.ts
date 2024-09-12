import mongoose from "mongoose";
import * as dotenv from 'dotenv'
dotenv.config()


const connect = async () => {
  try {
    await mongoose.connect(
        process.env.CONNTECTION_STING as string
    );
    console.log("connected");
  } catch (error) {
    error instanceof Error && console.log(error.message);
  }
};

export default connect;
