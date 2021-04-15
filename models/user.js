const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt"); // Import bcrypt

const UserSchema = new mongoose.Schema(
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
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      set: encryptData
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    watchlist: [{
      type: mongoose.Schema.ObjectId,
      ref: 'movie'
    }]
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

function encryptData(password){
  const encryptPassword = bcrypt.hashSync(password, 10)
  return encryptPassword
}
function getPhoto(photo) {
  return (photo) ? `/images/userPhoto/${photo}` : null
}
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema);