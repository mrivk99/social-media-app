const express = require("express");
const bodyParser = require("body-parser");

// configure app
const app = express();

// import the places-routes file
const placeRoutes = require("./routes/places-routes");

// parse the body and extract json and convert it to regular javascript objects
app.use(bodyParser.json());

// use the imported file for the endpoint
app.use("/api/places", placeRoutes);

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
