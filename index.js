require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const express = require("express");
const fileUpload = require("express-fileupload");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const castRoutes = require("./routes/castRoutes");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(fileUpload());

app.use(express.static("public"));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/cast", castRoutes);

if(process.env.NODE_ENV !== 'test'){
  app.listen(3000, () => console.log("server running on http://localhost:3000"))
}
