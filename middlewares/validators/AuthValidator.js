const validator = require("validator");

class AuthValidator {
  signup = (req, res, next) => {
    const errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Email is not valid");
    }

    let result = validator.isStrongPassword(req.body.password, {
      returnScore: true,
      minLength: "tes",
      pointsPerUnique: 0,
      pointsPerRepeat: 0,
      pointsForContainingLower: ",lower",
      pointsForContainingUpper: ",upper",
      pointsForContainingNumber: ",number",
      pointsForContainingSymbol: ",symbol",
    });
    // set all result to array
    result = result.split(",");
    // password check
    const passValid = ["0", "lower", "upper", "number", "symbol"];
    // password validation
    if (!validator.isStrongPassword(req.body.password)) {
      // check what validation is invoked
      const messageFilter = passValid.filter((i) => !result.includes(i));
      if (messageFilter.length > 0) {
        messageFilter.forEach((e) => {
          errors.push(`Password has no ${e} case`);
        });
      } else {
        errors.push("Password Length is not 8 character");
      }
    }

    if (req.body.confirmPassword !== req.body.password) {
      errors.push("Password is not the same");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  };

  signin = (req, res, next) => {
    const errors = [];

    if (!validator.isEmail(req.body.email)) {
      errors.push("Email is not valid");
    }
    const result = validator.isStrongPassword(req.body.password, { returnScore: true });
    console.log(result);
    if (!validator.isStrongPassword(req.body.password)) {
      errors.push("Password is not Strong");
    }

    if (errors.length > 0) {
      return res.status(400).json({
        message: errors.join(", "),
      });
    }
    next();
  };
}

module.exports = new AuthValidator();
