const { review, user, movie } = require("../models");

class ReviewController {
  // Get one
  async getMyReview(req, res) {
    try {
      // Find one data
      const userData = await user.findOne({ _id: req.user.id }).select({ name: 1, username: 1, image: 1 });
      const dataReview = await review.find({ userId: req.user.id }).sort({ _id: -1 }).limit(10);
      // if data not found
      if (!userData) {
        return res.status(404).json({
          message: "Review not found",
        });
      }

      // If successful
      return res.status(200).json({
        message: "Success",
        userData,
        dataReview,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } // end of Get One
  getUserReviews = async (req, res) => {
    try {
      const userData = await user.findOne({ _id: req.params.id }).select({ name: 1, username: 1, image: 1 });
      const userReview = await review.find({ userId: req.params.id }).sort({ createdAt: -1 }).limit(10);

      if (!userData) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Success",
        userData,
        userReview,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  };
  // Create Review
  async create(req, res) {
    try {
      // create data
      req.body.userId = req.user.id;
      const createReview = await review.create(req.body);
      await movie.updateOne({ _id: req.body.movieId }, { $push: { reviews: createReview._id } });

      // if successful
      return res.status(201).json({
        message: "Success",
        createReview,
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
