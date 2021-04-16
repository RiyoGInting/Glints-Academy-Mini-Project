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
  return poster ? `/images/moviePoster/${poster}`: null
}
function getTrailer(video) {
  return video ? `/videos/movieTrailer/${video}` : null;
}

// MovieSchema.pre('reviews', (next)=> {

// })

MovieSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("movie", MovieSchema);
