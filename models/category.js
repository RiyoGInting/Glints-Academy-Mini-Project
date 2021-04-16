const mongoose = require("mongoose"); // Import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
  }
);

// Enable soft delete
CategorySchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("category", CategorySchema); // Export category models
