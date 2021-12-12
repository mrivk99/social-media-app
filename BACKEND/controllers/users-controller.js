const uuid = require("uuid").v4;

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Max Schwarz",
    email: "test@test.com",
    password: "testers",
  },
];

const HttpError = require("../models/http-error");

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

const signup = (req, res, next) => {
  const { name, email, password } = req.body;

  // find if email already exists
  const hasUser = DUMMY_USERS.find(u => u.email === email);

  if(hasUser){
      throw new HttpError('Could not create user.User already exists')
  }

  const createdUser = {
    id: uuid(),
    name, // name : name
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
