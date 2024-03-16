import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.configDotenv();

console.log(process.env.MONGO_URI)

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_JOB_SEEKING_WEBAPP",
    })
    .then(() => {
      console.log("Connected to database.");
    })
    .catch((err) => {
      console.log(`Some Error occured. ${err}`);
    });
};
