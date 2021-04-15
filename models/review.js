const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// base model, update go ahead
const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: false,
      default: 0,
    },
    reviewUser: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    movieId: {
      type: mongoose.Schema.ObjectId,
      ref: "movie",
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema);
