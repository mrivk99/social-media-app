const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const getCoordsForAddress = require("../utils/location");
const HttpError = require("../models/http-error");

const getPlaceById = async (req, res, next) => {
  // extract placeId from URL
  const placeId = req.params.pid; //
  // search the given ID in db
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Please try again later",
      500
    );
    // stop trying when error occurs
    return next(error);
  }

  //Handle error using error model
  if (!place) {
    const error = new HttpError(
      "Could not find a place for the provided place id",
      404
    );
    return next(error);
  }
  //  convert the returned object by mongoose, to normal jsonObject
  res.json({ place: place.toObject({ getters: true }) });
};
const getPlacesByUserId = async (req, res, next) => {
  // get userId from query
  const userId = req.params.uid;

  // find the user in db
  let places;
  try {
    places = await Place.find({ creator: userId });
  } catch (err) {
    const error = new HttpError(
      "Fetching places for the user id failed.Please try again later",
      500
    );
    return next(error);
  }

  //Handle error METHOD 2 - Using middleware function
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a place for the provided user id", 404)
    );
  }
  //  convert the returned object by mongoose, to normal jsonObject
  // returned object is array , map it
  res.json({
    places: places.map((place) => place.toObject({ getters: true })),
  });
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
    creator, // creator : creator
  });
  try {
    // returns a promise
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating new place failed. Please try again later",
      500
    );
    // to avoid infinite loop use next
    return next(error);
  }
  res.status(201).json({ place: createdPlace });
};
// Only allow updating title and description
// PATCH Request
const updatePlace = async (req, res, next) => {
  // use express js validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors);
    throw new HttpError("Invalid Input. Please check your inputs");
  }

  // store the data from request body in variables
  const { title, description } = req.body;
  const placeId = req.params.pid;

  // find the place
  let updatedPlace;
  try {
    updatedPlace = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "No such place exists. Please try again later",
      500
    );
    // stop trying when error occurs
    return next(error);
  }
  // update the place
  updatedPlace.title = title;
  updatedPlace.description = description;
  // save the place
  try {
    await updatedPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while updating the place.",
      500
    );
  }

  res.status(200).json({ place: updatedPlace.toObject({ getters: true }) });
};
const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  // find the place
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Couldn't find place. Please try again", 500);
    return next(error);
  }
  // delete the place
  try {
    await place.remove();
  } catch (err) {
    const error = new HttpError("Couldn't remove place. Please try again", 500);
    return next(error);
  }

  res.status(200).json({ message: "Deleted place." });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
