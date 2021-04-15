const mongoose = require("mongoose");

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB Connected!"))
  .catch((err) => console.error(err));

const user = require("./user");

module.exports = { user };
