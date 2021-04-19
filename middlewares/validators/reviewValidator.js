const mongoose = require("mongoose");
const validator = require("validator");
const { review, movie, user } = require("../../models");

exports.getOne = (req, res, next) => {
  try {
    // check whether id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Review ID is not valid. Must be a 24 character-long hexadecimal",
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = [];

    // check if movieId is valid
    if (!mongoose.Types.ObjectId.isValid(req.body.movieId)) {
      errors.push("Movie ID is not valid.  Must be a 24 character-long hexadecimal");
    }

    // check if rating is numeric
    if (!validator.isNumeric(req.body.rating)) {
      errors.push("Rating must be a number");
    }

    // check if rating is between the numbers 1-5
    if (req.body.rating < 0 || req.body.rating > 6) {
      errors.push("Please rate movie between 1 to 5 stars");
    }

    // find user & movie IDs
    let findData = await movie.findOne({ _id: req.body.movieId })

    // if movie not found
    if (!findData) {
      errors.push("Movie not found");
    }

    // if errors present, collate here
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    let errors = [];

    // check if Review Id is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push("Review ID is not valid. Must be a 24 character-long hexadecimal");
    }

    // check if rating is between the numbers 1-5
    if (req.body.rating < 0 || req.body.rating > 6) {
      errors.push("Please rate movie between 1 to 5 stars");
    }

    // check if rating is numeric
    if (!validator.isNumeric(req.body.rating)) {
      errors.push("Rating must be a number");
    }

    // find user & movie IDs
    let findData = await review.findOne({ _id: req.params.id, userId: req.user.id });

    // if review not found
    if (!findData) {
      errors.push("Review is not for this user");
    }

    // if errors present, collate here
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    let errors = [];

    // check if review ID is valid
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      errors.push("Review ID is not valid. Must be a 24 character-long hexadecimal");
    }

    // find one review
    req.deleted = await review.findOne({ _id: req.params.id, userId: req.user.id });

    // if review not found
    if (!req.deleted) {
      errors.push("Item requested to delete is not exist");
    }

    // if errors present, collate here
    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
