import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Successfully connected to MongoDB!");
    } catch (error) {
        console.error("MongoDB connection failed.", error.message);
        process.exit(1);
    }
};

export default connectDB;