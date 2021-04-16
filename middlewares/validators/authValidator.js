const validator = require("validator");

exports.signup = async (req, res, next) => {
  try {
    let errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Please insert a valid email");
    }

    if (!validator.isAlpha(req.body.name, ["en-US"], { ignore: " " })) {
      errors.push("Name must be a valid alpha");
    }

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
    // password validation
    if (!validator.isStrongPassword(req.body.password)) {
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

    if (req.body.confirmPassword !== req.body.password) {
      errors.push("confirmation password must be same as password");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: err.message,
    });
  }
};

exports.signin = async (req, res, next) => {
  try {
    let errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Email not found");
    }

    if (!validator.isStrongPassword(req.body.password)) {
      errors.push("Wrong password");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }

    next();
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: e.message,
    });
  }
};
