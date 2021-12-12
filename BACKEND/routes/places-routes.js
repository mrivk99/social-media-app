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

// configure get request
router.get("/:pid", (req, res, next) => {
  // extract placeId from URL
  const placeId = req.params.pid; // { pid: 'p1' }
  // search the given ID in db 
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  //  return data
  res.json({ place : place}); 
});

module.exports = router;




