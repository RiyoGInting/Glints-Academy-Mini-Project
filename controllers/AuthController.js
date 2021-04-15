const jwt = require("jsonwebtoken");

class AuthController {
  getToken = async (req, res) => {
    try {
      const body = {
        user: {
          id: req.user._id,
        },
      };

      const token = jwt.sign(body, process.env.JWT_TOKEN, {
        expiresIn: "60d",
      });

      return res.status(200).json({
        message: "Token Created",
        token,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Token Creation Error",
        error: error.message,
      });
    }
  };
}

module.exports = new AuthController();
