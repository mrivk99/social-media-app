const uuid = require("uuid").v4;
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const User = require("../models/users");

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((p) => p.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identify user , credentials seem to be wrong",
      401
    );
  }
  res.json({ message: "Logged In" });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check input data", 422)
    );
  }
  const { name, email, password , places } = req.body;
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
    name:name,
    email:email,
    image:
      "https://media.istockphoto.com/photos/handsome-indian-man-using-mobile-phone-picture-id1094067774?k=20&m=1094067774&s=612x612&w=0&h=o7DPIyONt60piBli7b9-9BmH9RbLTElLRPn2a5Bfoqs=",
    password:password,
    places:places
  });

  try {
    // returns a promise
    await createdUser.save();
  } catch (err) {
    console.log(err);
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
