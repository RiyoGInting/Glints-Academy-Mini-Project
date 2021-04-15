const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

// base model, update go ahead
const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    releaseYear : {
      type: Date,
      required: true
    },
    averageRating: {
      type: Number,
      required: false,
      default: 0
    },
    review: [{
      type: mongoose.Schema.ObjectId,
      ref: 'review'
    }],
    poster : {
      type: String,
      required: false,
      default: null,
      get: getPoster
    },
    trailer : {
      type: String,
      required: false,
      default: null,
      get: getTrailer
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

function getPoster(poster) {
  return (poster) ? `/images/moviePoster/${poster}` : null
}
function getTrailer(video) {
  return (video) ? `/videos/movieTrailer/${video}` : null
}

MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema);