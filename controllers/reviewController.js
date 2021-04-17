const { review, user, movie } = require("../models");

class ReviewController {
  // Get All
  async getAll(req, res) {
    try {
      // Find all data
      let data = await review.find();

      // If no data
      if (data.length === 0) {
        return res.status(404).json({
          message: "No reviews found",
        });
      }

      // If successful
      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
      });
    }
  } // end of Get All

  // // Get All
  // async getAllByUser(req, res) {
  //   try {
  //     // Find all data
  //     let data = await review.find();

  //     // If no data
  //     if (data.length === 0) {
  //       return res.status(404).json({
  //         message: "No reviews found",
  //       });
  //     }

  //     // If successful
  //     return res.status(200).json({
  //       message: "Success",
  //       data,
  //     });
  //   } catch (err) {
  //     return res.status(500).json({
  //       message: "Internal Server Error",
  //       error: err.message,
  //     });
  //   }
  // } // end of Get All

  // Get One
  async getOne(req, res) {
    try {
      // Find one data
      let data = await review.findOne({ _id: req.params.id });

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
      let data = await review.create(req.body);

      // if successful
      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal server error",
        error: err.message,
      });
    }
  } // end of Create

  // Update Review
  async update(req, res) {
    try {
      // update data
      let data = await review.findOneAndUpdate(
        {
          _id: req.params.id, userId: req.user._id,
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
          await transaksi.delete({ _id: req.params.id });

          return res.status(200).json({
              message: "Success",
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