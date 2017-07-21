var express = require('express');
var router = express.Router();
var RecommendationController = require('../controllers/RecommendationController');

router.get('/:userId', RecommendationController.getRecommendations);

module.exports = router;
