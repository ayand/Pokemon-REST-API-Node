var express = require('express');
var router = express.Router();
var userController = require("../controllers/UserController");
var authController = require("../controllers/AuthController");

router.post("/signup", userController.signUp);

router.post("/signin", authController.signIn, function(req, res) {
    return res.send({ token: req.user.token, id: req.user.userNo })
});

module.exports = router;
