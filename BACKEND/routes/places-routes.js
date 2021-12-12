const express = require("express");

const HttpError = require("../models/http-error");
const placesControlllers = require("../controllers/places-controllers");
const router = express.Router();

// configure get request (this url is added after the app.use('/api/places' , placeRoutes)) in app.js
router.get("/:pid",placesControlllers.getPlaceById);

router.get("/user/:uid",placesControlllers.getPlaceByUserId);

module.exports = router;
