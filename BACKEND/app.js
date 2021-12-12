const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require("./models/http-error");

// configure app
const app = express();

// import the routes file
const placeRoutes = require("./routes/places-routes");
const usersRoutes = require('./routes/users-routes');


// parse the body and extract json and convert it to regular javascript objects
app.use(bodyParser.json());

// use the imported files for the endpoints
app.use("/api/places", placeRoutes);
app.use("/api/users",usersRoutes);


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
app.listen(5000);
