const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const CastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default: null,
      get: getImage,
    },
    movies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "movie",
      required: false,
    },
  },
  {
    // Enable timestamps
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    toJSON: { getters: true },
  }
);

function getImage(image) {
  if (!image) {
    return `/default/profile-picture.jpg`;
  }
  return `/images/${image}`;
}

// Enable soft delete
CastSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("cast", CastSchema); // Export user models
