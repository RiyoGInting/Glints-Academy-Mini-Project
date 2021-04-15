const { movie, review, category } = require("../models");

class MovieController {
  createMovie = async (req, res) => {
    try {
      const create = await movie.create(req.body);

      res.status(200).json({
        message: "Movie Succesfully Created",
        data: create,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error at Controller",
        error: error.message,
      });
    }
  };

  getAll = async (req, res) => {
    try {
      const getAll = await movie.find().populate("reviews").populate("category").populate("casts");
      return res.status(200).json({
        message: "Success",
        result: getAll,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error at Controller",
        error: error.message,
      });
    }
  };
  // two more getone filter title and category?
  getOne = async (req, res) => {
    try {
      const getOne = await movie
        .findOne({ _id: req.params.id })
        .populate("reviews")
        .populate("category")
        .populate("casts");
      return res.status(200).json({
        message: "success",
        result: getOne,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  updateMovie = async (req, res) => {
    try {
      const create = await movie.updateOne(
        {
          _id: req.params.id,
        },
        { ...req.body, $push: { casts: req.body.castId } },
        { new: true }
      );
      return res.status(200).json({
        message: "Success",
        data: create,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };
  deleteMovie = async (req, res) => {
    try {
      const result = await movie.findOne({ _id: req.params.id });
      await review.deleteMany({
        _id: { $in: result.reviews },
      });

      return res.status(200).json({
        message: "Success",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error at Controller",
        error: error.message,
      });
    }
  };
  // testing purposes
  createReview = async (req, res) => {
    try {
      const create = await review.create(req.body);
      const update = await movie.updateOne(
        {
          _id: req.body.movieId,
        },
        { $push: { reviews: { _id: create._id } } },
        {
          new: true,
        }
      );
      return res.status(200).json({
        message: "Success",
      });
    } catch (error) {
      return res.status(500).json({
        message: "internal Server Error at controller",
        error: error.message,
      });
    }
  };

  createCategory = async (req, res) => {
    try {
      const create = await category.create(req.body);
      return res.status(200).json({
        message: "Success",
        data: create,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error at Controller",
        error: error.message,
      });
    }
  };
}

module.exports = new MovieController();
