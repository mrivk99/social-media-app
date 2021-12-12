const uuid = require("uuid").v4;

const HttpError = require("../models/http-error");
// import data for db
let DUMMY_PLACES = [
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

const getPlaceById = (req, res, next) => {
  // extract placeId from URL
  const placeId = req.params.pid; // { pid: 'p1' }
  // search the given ID in db
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });

  //Handle error using error model
  if (!place) {
    throw new HttpError(
      "Could not find a place for the provided place id",
      404
    );
  }
  //  return data
  res.json({ place: place });
};
const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter((place) => {
    return place.creator === userId;
  });

  //Handle error METHOD 2 - Using middleware function
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }

  res.json({ places });
};
const createPlace = (req, res, next) => {
  // map the json data from the body and store it in constants
  const { title, description, coordinates, address, creator } = req.body;

  const createdPlace = {
    id: uuid(),
    title: title,
    description: description,
    location: coordinates,
    address, // address : address
    creator, // creator : creator
  };

  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({ place: createdPlace });
};
// Only allow updating title and description
const updatePlace = (req, res, next) => {
  // store the data from request body in variables
  const { title, description } = req.body;
  const placeId = req.params.pid;

  // Use the spread operator (...) to "pull all elements of the old array out" and add store them in new const
  // Don't directly update the title and description in db , instead make the final object before updating
  const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};
const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;

  // filter the array where the condition is met , replace the entire array.
  DUMMY_PLACES = DUMMY_PLACES.filter((p) => {
    p.id !== placeId;
  });

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
