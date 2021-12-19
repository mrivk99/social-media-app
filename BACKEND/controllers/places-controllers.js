const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const getCoordsForAddress = require("../utils/location");
const HttpError = require("../models/http-error");

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
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    return next(HttpError("Invalid Input. Please check your inputs"));
  }

  // map the json data from the body and store it in constants
  const { title, description, address, creator } = req.body;

  // dummy geocoding the address
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  // map the variables
  const createdPlace = new Place({
    title: title,
    description: description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
    creator // creator : creator
  });
  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      'Creating new place failed. Please try again later',
      500
    );
    // to avoid infinite loop use next
    return next(error);
  }
  res.status(201).json({place : createdPlace});
  
};
// Only allow updating title and description
const updatePlace = (req, res, next) => {
  // use express js validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid Input. Please check your inputs");
  }

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

  if (
    !DUMMY_PLACES.find((p) => {
      p.id !== placeId;
    })
  ) {
    return new HttpError("Could not find a place with given Id", 404);
  }
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
