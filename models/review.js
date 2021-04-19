const mongoose = require("mongoose"); // import mongoose
const mongooseDelete = require("mongoose-delete"); // Import mongoose-delete

const ReviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please rate between 1 and 5"],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

// only permits user to submit one review per movie
ReviewSchema.index({ movieId: 1, userId: 1 }, { unique: true });

// Static method to get average rating
ReviewSchema.statics.getAverageRating = async function (movieId) {
  const obj = await this.aggregate([
    {
      $match: { movieId: movieId },
    },
    {
      /*fix this */
      $group: {
        _id: "$movieId",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);
  console.log(obj)
  try {
    await this.model("movie").findByIdAndUpdate(movieId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
};

// call getAverageRating after posting review
ReviewSchema.post("save", function () {
  this.constructor.getAverageRating(this.movieId);
});
// call getAverageRating after deleting review
ReviewSchema.pre("remove", function () {
  this.constructor.getAverageRating(this.movieId);
});
// calculate averate rating after update review
ReviewSchema.post("findOneAndUpdate", async function (e) {
  try {
    const obj = await mongoose.model("review").aggregate([
      {
        $match: { movieId: e.movieId },
      },
      {
        /*fix this */
        $group: {
          _id: "$movieId",
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    await mongoose.model("movie").findByIdAndUpdate(e.movieId, {
      averageRating: obj[0].averageRating,
    });
  } catch (err) {
    console.error(err);
  }
});

// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema, "review"); // export model
