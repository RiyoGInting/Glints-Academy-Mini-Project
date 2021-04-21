const { movie } = require("../../models");
const validator = require("validator");

class MovieValidator {
  getAllValidator = async (req, res, next) => {
    try {
      if (req.params.page) {
        if (!validator.isNumeric(req.params.page)) {
          return res.status(400).json({
            message: "Page request must be numerical",
          });
        }
        let total = await movie.find();
        total = Math.ceil(total.length / 10);
        if (req.params.page > total) {
          return res.status(400).json({
            message: "Page request out of index",
          });
        }
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };

  categoryValidator = async (req, res, next) => {
    try {
      if (req.params.page) {
        if (!validator.isNumeric(req.params.page)) {
          return res.status(400).json({
            message: "Page request must be numerical",
          });
        }
        let total = await movie.find({ category: req.params.category });
        total = Math.ceil(total.length / 10);
        if (req.params.page > total) {
          return res.status(400).json({
            message: "Page request out of index",
          });
        }
      }
      next();
    } catch (error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  };
}

module.exports = new MovieValidator();
