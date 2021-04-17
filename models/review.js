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
            required: true,
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

// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema, "review"); // export model