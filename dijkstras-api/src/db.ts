import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const mongoURI = process.env.MONGO_URI || "";

mongoose.connect(mongoURI, {
//DONT FORGET TO HIDE
});

export default mongoose.connection;

