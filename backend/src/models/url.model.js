import mongoose from "mongoose";

const URLSchema = new mongoose.Schema(
  {
    originalURL: {
      type: String,
      required: [true, "Original URL is required"],
    },

    shortID: {
      type: String,
      required: [true, "Short URL is required"],
      unique: [true, "Short URL must be unique"],
    },

    clicks: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const URLModel = mongoose.model("urlModel", URLSchema);

export default URLModel;
