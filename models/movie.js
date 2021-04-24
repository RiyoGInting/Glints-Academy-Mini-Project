const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const MovieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    synopsis: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      required: false,
      default: 0,
    },
    director: {
      type: String,
      required: false
    },
    budget: {
      type: Number,
      required: false
    },
    studio: {
      type: String,
      required: false
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
    },
    reviews: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "review",
      },
    ],
    casts: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "cast",
      },
    ],
    poster: {
      type: String,
      required: false,
      default: null,
      get: getPoster,
    },
    trailer: {
      type: String,
      required: false,
      default: null,
      get: getTrailer,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

function getPoster(poster) {
  return poster ? `/images/moviePoster/${poster}` : `/default/default-poster.png`;
}
function getTrailer(video) {
  return video ? `/videos/movieTrailer/${video}` : `/default/default-poster.png`;
}

MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema);
