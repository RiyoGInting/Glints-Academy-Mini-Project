require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
// import required tools
const express = require("express");
const fileUpload = require("express-fileupload");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const fs = require('fs')
// import route
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const castRoutes = require("./routes/castRoute");
const movieRoutes = require("./routes/movieRoutes");
const categoryRoutes = require("./routes/categoryRoute");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(fileUpload());
// Sanitize data
app.use(mongoSanitize());

// Prevent XSS attact
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Use helmet
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// CORS
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
    flags: "a",
  });
  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

app.use(express.static("public"));
// set route
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cast", castRoutes);
app.use("/movie", movieRoutes);
app.use("/category", categoryRoutes);

if (process.env.NODE_ENV !== "test") {
  app.listen(3000, () => console.log("server running on http://localhost:3000"));
}

module.exports = app