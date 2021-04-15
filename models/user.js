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
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

function encryptPassword(password) {
  const encryptPassword = bcrypt.hashSync(password, 10);
  return encryptPassword;
}

UserSchema.plugin(mongooseDelete, { overrideMethods: "all" });

module.exports = mongoose.model("user", UserSchema);
