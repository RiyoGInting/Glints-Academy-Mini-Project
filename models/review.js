const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

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
    movieId: {
      type: mongoose.Schema.ObjectId,
      ref: "movie",
    },
    userId: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
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
