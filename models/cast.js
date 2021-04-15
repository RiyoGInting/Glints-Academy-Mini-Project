const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt"); // Import bcrypt

// base model, update go ahead
const CastSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image : {
      type: String,
      required: false,
      default: null,
      get: getPhoto
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);
function getPhoto(photo) {
  return (photo) ? `/images/castPhoto/${photo}` : null
}
CastSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("cast", CastSchema);