var express = require('express');
var router = express.Router();
var RatingController = require("../controllers/RatingController");
var AuthController = require("../controllers/AuthController");

router.post('/', AuthController.isAuthenticated, RatingController.postRatings);

router.get('/', AuthController.isAuthenticated, RatingController.getRating);

router.put('/', AuthController.isAuthenticated, RatingController.updateRating);

module.exports = router;
