const express = require("express");

const router = express.Router();

// import data for db
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

// configure get request (this url is added after the app.use('/api/places' , placeRoutes)) in app.js
router.get("/:pid", (req, res, next) => {
  // extract placeId from URL
  const placeId = req.params.pid; // { pid: 'p1' }
  // search the given ID in db
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  //Handle error METHOD 1 - Using express Errror handler
  if (!place) {
    const error = new Error("Could not find a place for the provided place id");
    error.code = 404;
    throw error;
  }
  //  return data
  res.json({ place: place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;

  const userPlace = DUMMY_PLACES.find((place) => {
    return place.creator === userId;
  });

  //Handle error METHOD 2 - Using middleware function
  if (!userPlace) {
    const error = new Error("Could not find a place for the provided user id");
    error.code = 404;
    return next(error);
  }
  res.json({ place: userPlace });
});
module.exports = router;
