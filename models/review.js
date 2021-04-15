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

// enable soft delete
ReviewSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("review", ReviewSchema, "review"); // export model