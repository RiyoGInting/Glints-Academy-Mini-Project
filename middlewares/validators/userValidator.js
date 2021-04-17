const validator = require("validator");

exports.update = async (req, res, next) => {
  try {
    let errors = [];

    if (req.body.name && !validator.isAlpha(req.body.name, ["en-US"], { ignore: " " })) {
      errors.push("Name must be a valid alpha");
    }

    // password validation
    if (req.body.password && !validator.isStrongPassword(req.body.password)) {
      let result = validator.isStrongPassword(req.body.password, {
        returnScore: true,
        pointsPerUnique: 0,
        pointsPerRepeat: 0,
        pointsForContainingLower: ",lower",
        pointsForContainingUpper: ",upper",
        pointsForContainingNumber: ",number",
        pointsForContainingSymbol: ",symbol",
      });
      // set all return result to array
      result = result.split(",");
      // complete password parameter
      const passValid = ["0", "lower", "upper", "number", "symbol"];
      // check what validation is invoked
      const messageFilter = passValid.filter((i) => !result.includes(i));
      if (messageFilter.length > 0) {
        // push the validation message to errors array
        messageFilter.forEach((e) => {
          errors.push(`Password has no ${e} case`);
        });
      } else {
        // trigger happen if password is not 8 character
        errors.push("Password Length is not 8 character");
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};
