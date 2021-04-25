const { movie, review } = require("../models");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

class MovieController {
  getAll = async (req, res) => {
    try {
      let total = await movie.find();
      // if (req.params.page == 0) req.params.page = 1;
      const skip = req.params.page * 10;

      total = Math.ceil(total.length / 10);
      const getAll = await movie.find().skip(skip).limit(10);

      return res.status(200).json({
        message: "Success",
        result: getAll,
        totalPage: total,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  getAllbyCategory = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.category)) {
        return res.status(400).json({
          message: "Id request is not valid",
        });
      }
      let total = await movie.find({ category: req.params.category });
      if (req.params.page == 0) req.params.page = 1;
      const skip = (req.params.page - 1) * 10;

      total = Math.ceil(total.length / 10);
      const getCategory = await movie.find({ category: req.params.category }).skip(skip).limit(10);

      return res.status(200).json({
        message: "Success Get Category",
        result: getCategory,
        totalPage: total,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  getAllbyTitle = async (req, res) => {
    try {
      const getTitle = await movie.find({ title: { $regex: req.params.title, $options: "i" } }).limit(10);

      return res.status(200).json({
        message: "Success Get Title by Search",
        result: getTitle,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  getOne = async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
          message: "Id request is not valid",
        });
      }

      const getOne = await movie
        .findOne({ _id: req.params.id })
        .populate({ path: "reviews", populate: { path: "userId", select: { name: 1, username: 1, image: 1 } } })
        .populate("categories")
        .populate("casts");

      return res.status(200).json({
        message: `Get One Movie by Id with title ${getOne.title}`,
        result: getOne,
      });
    } catch (error) {
      res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  createMovie = async (req, res) => {
    try {
      if (req.files) await this.setFiles(req, res);

      const create = await movie.create(req.body);

      return res.status(200).json({
        message: "Movie Successfully Registered",
        data: create,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  updateMovie = async (req, res) => {
    try {
      if (req.files) {
        if (req.files.poster) {
          await this.setFiles(req, res);
          const filePath = await movie.findOne({ _id: req.params.id });
          await this.delFiles(filePath.poster);
        }
        if (req.files.trailer) {
          await this.setFiles(req, res);
          const filePath = await movie.findOne({ _id: req.params.id });
          await this.delFiles(filePath.trailer);
        }
      }

      await movie.updateOne({ _id: req.params.id }, { $set: req.body }, { new: true });

      const result = await movie.findOne({ _id: req.params.id });

      return res.status(200).json({
        message: "Movie Successfully Updated",
        data: result,
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

      await review.deleteMany({ _id: { $in: result.reviews } });

      await this.delFiles(result.poster);
      await this.delFiles(result.trailer);

      await movie.deleteOne({ _id: req.params.id });

      return res.status(200).json({
        message: `Success, Movie ${result.title} is Deleted`,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  };

  setFiles = async (req, res) => {
    if (req.files.poster) {
      const file = req.files.poster;
      const filePath = "images/moviePoster/";

      if (!file.mimetype.startsWith("image")) {
        return res.status(400).json({ message: "File must be an image " });
      }

      const fileName = crypto.randomBytes(16).toString("hex");

      file.name = `${fileName}${path.parse(file.name).ext}`;

      req.body.poster = file.name;

      try {
        await file.mv(`./public/${filePath}${file.name}`, (err) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      } catch (error) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
    if (req.files.trailer) {
      const file = req.files.trailer;
      const filePath = "videos/movieTrailer/";

      if (!file.mimetype.startsWith("video")) {
        return res.status(400).json({ message: "File must be a videos " });
      }

      const fileName = crypto.randomBytes(16).toString("hex");

      file.name = `${fileName}${path.parse(file.name).ext}`;

      req.body.trailer = file.name;

      try {
        await file.mv(`./public/${filePath}${file.name}`, (err) => {
          if (err) {
            console.log(err);

            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      } catch (error) {
        return res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  };

  delFiles = (filePath) => {
    filePath = `./public${filePath}`;

    fs.unlink(filePath, (err) => {
      if (err && err.code == "ENOENT") {
        // file doens't exist
        console.info("File doesn't exist, won't remove it.");
      } else if (err) {
        // other errors, e.g. maybe we don't have enough permission
        console.error("Error occurred while trying to remove file");
      } else {
        console.info(`removed`);
      }
    });
  };
}

module.exports = new MovieController();
