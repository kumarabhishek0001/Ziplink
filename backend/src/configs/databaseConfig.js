import chalk from "chalk";
import mongoose from "mongoose";
import logError from "../utils/logger.js";

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(chalk.bgGreenBright("Connected to database successfully"));
  } catch (error) {
    console.log(chalk.red("CONNECTION FAILED"));
    logError(error, "connectDB, databaseConfig.js");
  }
};

export default connectDB;
