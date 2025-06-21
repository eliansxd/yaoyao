import "../YaoYao";
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI as string;

if (!mongoUri) {
    throw new Error("MONGO_URI is not defined in environment variables.");
}

async function run() {
    try {
        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB.");
    } catch (err) {
        console.error("MongoDB connection error: ", err);
    }
}

run();
