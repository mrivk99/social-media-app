const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/users");

// find is async task , so use let instead of const to store the returned response

const getUsers = async(req, res, next) => {
  let users;
  try {
    // return all the users with their respective fields except passwords
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed. Please try again later",
      500
    );
    return next(error);
  }

  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const login = async (req, res, next) => {
const {name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("User doesn't exist.Try again later", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("Invalid Credentials. Try again later.", 401);
    return next(error);
  }

  res.json({ message: "User " + email + " Logged In" });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check input data", 422)
    );
  }
  const { name, email, password } = req.body;
  // find if User already exists
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("SignUp failed.Try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "Could not create user.User already exists",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name: name,
    email: email,
    image:
      "https://media.istockphoto.com/photos/handsome-indian-man-using-mobile-phone-picture-id1094067774?k=20&m=1094067774&s=612x612&w=0&h=o7DPIyONt60piBli7b9-9BmH9RbLTElLRPn2a5Bfoqs=",
    password: password,
    places: []
  });

  try {
    // returns a promise
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed. Please try again later",
      500
    );
    // to avoid infinite loop use next
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
