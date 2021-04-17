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
        }
    }
)

// only permits user to submit one review per movie
ReviewSchema.index({ movie: 1, user:1 }, { unique: true });


// // Static method to get average rating
// ReviewSchema.statics.getAverageRating = async function (movieId) {
//     const obj = await this.aggregate([
//       {
//         $match: { movie: movieId },
//       },
//       {
//         $group: {
//           _id: "$bootcamp",
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);
  
//     try {
//       await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
//         averageRating: obj[0].averageRating,
//       });
//     } catch (e) {
//       console.error(e);
//     }
//   };


// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema, "review"); // export model