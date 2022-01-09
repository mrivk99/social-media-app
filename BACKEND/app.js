const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const HttpError = require("./models/http-error");

// configure app
const app = express();

// import the routes file
const placeRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");

// parse the body and extract json and convert it to regular javascript objects
app.use(bodyParser.json());

// Comply with CORS policy
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// use the imported files for the endpoints
app.use("/api/places", placeRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});
// So this function, will execute if any middleware in front of it yields an error
app.use((error, req, res, next) => {
  //check if a response has already been sent
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured!" });
});

// connect to db
// then() => connection is successful and catch() => catch the error.
mongoose
  .connect(
    "mongodb+srv://MRIDUL:dBdkBzHhrW6YTAG0@cluster0.y6qig.mongodb.net/mern?retryWrites=true&w=majority"
  )
  .then(app.listen(5000))
  .catch((err) => {
    console.log(err);
  });
