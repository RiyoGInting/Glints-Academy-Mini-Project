const mongoose = require("mongoose");
const validator = require("validator");
const { category } = require("../../models");

class CategoryValidator {
  async getOne(req, res, next) {
    try {
      let errors = [];
      let checkId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!checkId) {
        errors.push(`ID is invalid`);
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async delete(req, res, next) {
    try {
      let errors = [];
      let checkId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!checkId) {
        errors.push(`ID is invalid`);
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async create(req, res, next) {
    try {
      let errors = [];
      //check if name is just using alphabet
      if (!validator.isAlphanumeric(validator.blacklist(req.body.name, " "))) {
        errors.push("Name must be alphabet only");
      }

      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }
      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
      });
    }
  }

  async update(req, res, next) {
    try {
      let errors = [];
      let checkId = mongoose.Types.ObjectId.isValid(req.params.id);
      if (!checkId) {
        errors.push(`ID is invalid`);
      }
      //check if naea is just using alphabet
      if (!validator.isAlphanumeric(validator.blacklist(req.body.nama, " "))) {
        errors.push("Nama harus diisi dengan huruf saja");
      }
      //check if name is just using alphabet
      if (!validator.isAlphanumeric(validator.blacklist(req.body.name, " "))) {
        errors.push("Name must be alphabet only");
      }
      if (errors.length > 0) {
        return res.status(400).json({
          message: errors.join(", "),
        });
      }

      next();
    } catch (e) {
      console.log(e);
      return res.status(500).json({
        error: e,
      });
    }
  }
}

module.exports = new CategoryValidator();
