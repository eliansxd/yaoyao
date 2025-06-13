import "../";
import mongoose from "mongoose";

const mongoUri = process.env.MONGO_URI as string;

mongoose
    .connect(mongoUri)
    .then(() => console.log(`Connected to MongoDB`))
    .catch(console.error);
