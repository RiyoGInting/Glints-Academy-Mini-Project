const crypto = require("crypto");
const path = require("path");
const { user } = require("../models");
const { findById } = require("../models/category");

class UserController {
  async getOne(req, res) {
    try {
      const data = await user.findOne({ _id: req.user.id }).select("-role");

      if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }
  }

  async update(req, res) {
    try {
      // If image was uploaded
      if (req.files) {
        const file = req.files.image;

        // Make sure image is photo
        if (!file.mimetype.startsWith("image")) {
          return res.status(400).json({ message: "File must be an image" });
        }

        // Check file size (max 1MB)
        if (file.size > 1000000) {
          return res
            .status(400)
            .json({ message: "Image must be less than 1MB" });
        }

        // Create custom filename
        let fileName = crypto.randomBytes(16).toString("hex");

        // Rename the file
        file.name = `${fileName}${path.parse(file.name).ext}`;

        // assign req.body.image with file.name
        req.body.image = file.name;

        // Upload image to /public/images
        file.mv(`./public/images/${file.name}`, async (err) => {
          if (err) {
            return res.status(500).json({
              message: "Internal Server Error",
              error: err,
            });
          }
        });
      }

      const data = await user.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        req.body,
        {
          new: true,
        }
      );

      return res.status(201).json({
        message: "Success",
        data,
      });
    } catch (e) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async addWatchlist(req, res) {
    try {
      const data = await user.findOneAndUpdate(
        { _id: req.user.id },
        { $addToSet: { watchlist: req.body.movieId } },
        { new: true }
      );

      return res.status(201).json({
        message: "Added to watchlist",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async getWatchlist(req, res) {
    try {
      const data = await user.findOne({ _id: req.user.id }).populate({
        path: "watchlist",
        select: "poster title",
      });

      return res.status(200).json({
        message: "Success",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }

  async removeWatchlist(req, res) {
    try {
      const data = await user.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { watchlist: req.body.movieId } },
        { new: true }
      );
      return res.status(201).json({
        message: "Removed from watchlist",
        data,
      });
    } catch (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: e,
      });
    }
  }
}

module.exports = new UserController();
