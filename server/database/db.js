import mongoose from "mongoose";

export const connectDB = () => {
  try {
    mongoose
      .connect(process.env.MONGODB_URI, {
        dbName: "MERN_LMS",
      })
      .then(() => {
        console.log("Connected to MongoDB");
      });
  } catch (error) {
    console.error(error);
    console.log("Error while connecting");
    process.exit(1);
  }
};
