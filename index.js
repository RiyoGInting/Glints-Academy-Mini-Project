require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')

app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({
  extended: true
})); // support encoded bodies

const movieRoutes = require('./routes/movieRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

app.use(fileUpload());

app.use('/movie', movieRoutes)
app.use('/auth', userRoutes)

if(process.env.NODE_ENV !== 'test'){
  app.listen(3000, () => console.log("server running on http://localhost:3000"))
}