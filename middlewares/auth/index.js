const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const { user } = require("../../models");

exports.signup = (req, res, next) => {
  passport.authenticate("signup", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

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
        let userSignUp = await user.create(req.body);

        return done(null, userSignUp, {
          message: "User can be created",
        });
      } catch (e) {
        return done(null, false, {
          message: "This email is already in use",
        });
      }
    }
  )
);

exports.signin = (req, res, next) => {
  passport.authenticate("signin", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err,
      });
    }

    if (!user) {
      return res.status(401).json({
        message: info.message,
      });
    }

    req.user = user;

    next();
  })(req, res, next);
};

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
        let userSignIn = await user.findOne({ email });

        if (!userSignIn) {
          return done(null, false, {
            message: "Email not found",
          });
        }

        let validate = await bcrypt.compare(password, userSignIn.password);

        if (!validate) {
          return done(null, false, {
            message: "Wrong password",
          });
        }

        return done(null, userSignIn, {
          message: "User can sign in",
        });
      } catch (e) {
        return done(null, false, {
          message: "User can't sign in",
        });
      }
    }
  )
);
