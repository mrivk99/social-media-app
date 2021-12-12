const express = require("express");
const { check, checkSchema } = require("express-validator");

const usersControlllers = require("../controllers/users-controller");

const router = express.Router();

// configure get request (this url is added after the app.use('/api/places' , placeRoutes)) in app.js
router.get("/",usersControlllers.getUsers);

router.post("/signup",[check('name').not().isEmpty(),
check('email').normalizeEmail().isEmail(),
check('password').isLength({min:6})
],usersControlllers.signup);

router.post("/login",usersControlllers.login);

module.exports = router;
