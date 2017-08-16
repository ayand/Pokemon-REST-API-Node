var express = require('express');
var router = express.Router();
var RatingController = require("../controllers/RatingController");
var AuthController = require("../controllers/AuthController");

router.post('/', AuthController.isAuthenticated, RatingController.postRatings);

module.exports = router;
