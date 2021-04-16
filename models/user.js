const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      set: encryptPassword,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    username: {
      type: String,
      default: null,
      required: false,
    },
    image: {
      type: String,
      default: null,
      required: false,
      get: getImage,
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

function encryptPassword(password) {
  const encryptPassword = bcrypt.hashSync(password, 10);
  return encryptPassword;
}

function getImage(image) {
  if (!image) {
    return null;
  }
  return `/images/${image}`;
}
UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema);
