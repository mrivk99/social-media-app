const express = require("express");
const { check } = require("express-validator");

const HttpError = require("../models/http-error");
const placesControlllers = require("../controllers/places-controllers");
const router = express.Router();

// configure get request (this url is added after the app.use('/api/places' , placeRoutes)) in app.js
router.get("/:pid", placesControlllers.getPlaceById);

router.get("/user/:uid", placesControlllers.getPlacesByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address").not().isEmpty(),
  ],
  placesControlllers.createPlace
);

router.patch("/:pid", placesControlllers.updatePlace);

router.delete("/:pid", placesControlllers.deletePlace);

module.exports = router;
