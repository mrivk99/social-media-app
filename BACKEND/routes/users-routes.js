const express = require("express");

const usersControlllers = require("../controllers/users-controller");

const router = express.Router();

// configure get request (this url is added after the app.use('/api/places' , placeRoutes)) in app.js
router.get("/",usersControlllers.getUsers);

router.post("/signup",usersControlllers.signup);

router.post("/login",usersControlllers.login);

module.exports = router;
