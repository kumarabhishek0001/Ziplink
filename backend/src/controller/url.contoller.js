import { nanoid } from "nanoid";
import logError from "./../utils/logger.js";
import URLModel from "../models/url.model.js";

const shortenURLController = async (req, res) => {
  try {
    const { originalURL } = req.body;

    // CHECK IF URL IS PROVIDED OR NOT
    if (!originalURL) {
      return res.status(400).json({
        status: "Failed",
        code: "URL_NOT_FOUND",
        message: "Please provide URL",
      });
    }

    // CHECK IF URL IS VALID OR NOT
    try {
      new URL(originalURL);
    } catch (error) {
      return res.status(400).json({
        status: "Failed",
        code: "INVALID_URL",
        message: "Please provide a valid URL",
      });
    }

    let shortID;
    let exists = true;

    while (exists) {
      shortID = nanoid(7);
      exists = await URLModel.findOne({ shortID });
    }

    const url = await URLModel.create({
      originalURL,
      shortID,
    });

    res.status(200).json({
      status: "Success",
      message: "URL created successfully",
      shortID: url.shortID,
      shortURL: `${process.env.BASE_URL}/${url.shortID}`,
    });
  } catch (error) {
    logError(error, "shortenURLController, url.contoller.js");
    res.status(500).json({
      status: "Failed",
      code: "INTERNAL_SERVER_ERROR",
      message: "Please try after some time",
    });
  }
};

const visitShortURLController = async (req, res) => {
  try {
    const { shortID } = req.params;

    if (!shortID) {
      return res.status(400).json({
        status: "Failed",
        code: "INVALID_URL",
        message: "Please provide valid URL",
      });
    }

    const url = await URLModel.findOne({ shortID });

    if (!url) {
      return res.status(404).json({
        status: "Failed",
        code: "NOT_FOUND",
        message: "Url not found",
      });
    }

    url.clicks += 1;
    await url.save();


    return res.redirect(url.originalURL)


  } catch (error) {
    logError(error, "visitShortURLController, url.controller.js");
    res.status(500).json({
      status: "Failed",
      code: "INTERNAL_SERVER_ERROR",
      message: "Please try after some time",
    });
  }
};

export { shortenURLController, visitShortURLController };
