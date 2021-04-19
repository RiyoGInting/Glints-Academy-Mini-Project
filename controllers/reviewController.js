const { review, user, movie } = require("../models");

class ReviewController {
  // Get one
  async getOne(req, res) {
    try {
      // Find one data
      let data = await review.findOne({ _id: req.params.id, userId: req.user.id });

      // if data not found
      if (!data) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      // If successful
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } // end of Get One

  // Create Review
  async create(req, res) {
    try {
      // create data
      req.body.userId = req.user.id;
      let data = await review.create(req.body);

      // if successful
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error controller",
        error: err.message,
      });
    }
  } // end of Create

  // Update Review
  async update(req, res) {
    try {
      req.body.userId = req.user.id;
      let data = await review.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        req.body, // this includes all of req.body
        {
          new: true,
        }
      );

      // If successful
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } // end of Update

  // Delete Review
  async delete(req, res) {
    try {
      // delete data
      await req.deleted.remove();

      return res.status(200).json({
        message: "Delete review success",
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  }
}

module.exports = new ReviewController();
