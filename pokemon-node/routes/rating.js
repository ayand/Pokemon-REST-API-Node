var express = require('express');
var router = express.Router();
var RatingController = require("../controllers/RatingController");

router.post('/', RatingController.postRatings);

module.exports = router;
