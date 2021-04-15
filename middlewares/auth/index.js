const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt"); // Import bcrypt
const JWTstrategy = require("passport-jwt").Strategy; // Import JWT Strategy
const ExtractJWT = require("passport-jwt").ExtractJwt; // Import ExtractJWT
const { user } = require("../../models");

class PassportMiddleware {
  constructor() {
    this.signupInit();
    this.signinInit();
    this.adminInit();
    this.userInit();
  }
  signupInit = () => {
    passport.use(
      "signup",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        async (req, email, password, done) => {
          try {
            console.log(req.body);

            const userSignUp = await user.create(req.body);

            return done(null, userSignUp, {
              message: "User can be created",
            });
          } catch (error) {
            // console.log(error)
            return done(null, false, {
              message: "User can't be created",
              error: error.message,
            });
          }
        }
      )
    );
  };

  signinInit = () => {
    passport.use(
      "signin",
      new LocalStrategy(
        {
          usernameField: "email",
          passwordField: "password",
          passReqToCallback: true,
        },
        async (req, email, password, done) => {
          try {

            const userSignIn = await user.findOne({
              email,
            });

            if (!userSignIn) {
              return done(null, false, {
                message: "Email Tidak Valid",
              });
            }

            const validate = await bcrypt.compare(password, userSignIn.password);

            if (!validate) {
              return done(null, false, {
                message: "Password tidak Valid",
              });
            }
            return done(null, userSignIn, {
              message: "User Sign in",
            });
          } catch (error) {
            // console.log(error)
            return done(null, false, {
              message: "User can't be created",
              error: error.message,
            });
          }
        }
      )
    );
  };

  adminInit = () => {
    passport.use(
      "admin",
      new JWTstrategy(
        {
          secretOrKey: process.env.JWT_TOKEN, // JWT Key
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Get token from bearer
        },
        async (token, done) => {
          try {
            // Find user
            const userLogin = await user.findOne({ _id: token.user.id });

            // If user is admin
            if (userLogin.role.includes("admin")) {
              return done(null, token.user);
            }

            return done(null, false, {
              message: "You're not authorized",
            });
          } catch (e) {
            return done(null, false, {
              message: "You're not authorized",
            });
          }
        }
      )
    );
  };

  userInit = () => {
    passport.use(
      "user",
      new JWTstrategy(
        {
          secretOrKey: process.env.JWT_TOKEN, // JWT Key
          jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), // Get token from bearer
        },
        async (token, done) => {
          try {
            // Find user
            const userLogin = await user.findOne({ _id: token.user.id });

            // If user is admin
            if (userLogin.role.includes("user")) {
              return done(null, token.user);
            }

            return done(null, false, {
              message: "You're not authorized",
            });
          } catch (e) {
            return done(null, false, {
              message: "You're not authorized",
            });
          }
        }
      )
    );
  };

  signup = async (req, res, next) => {
    passport.authenticate("signup", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Errot at signup",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Errot at User",
          error: info.message,
        });
      }

      req.user = user;

      next();
    })(req, res, next);
  };

  signin = async (req, res, next) => {
    passport.authenticate("signin", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Errot at signup",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Errot at User",
          error: info.message,
        });
      }

      req.user = user;

      next();
    })(req, res, next);
  };

  adminCheck = async (req, res, next) => {
    passport.authorize("admin", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Errot at signup",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Errot at User",
          error: info.message,
        });
      }

      req.user = user;

      next();
    })(req, res, next);
  };

  userCheck = async (req, res, next) => {
    passport.authorize("user", { session: false }, (err, user, info) => {
      if (err) {
        return res.status(500).json({
          message: "Errot at signup",
          error: err.message,
        });
      }

      if (!user) {
        return res.status(401).json({
          message: "Errot at User",
          error: info.message,
        });
      }

      req.user = user;

      next();
    })(req, res, next);
  };
}

module.exports = new PassportMiddleware();
