import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(uri, {
      dbName: "solid",
    });
    isConnected = true;
    console.log("Database connected");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};
