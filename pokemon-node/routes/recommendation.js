var express = require('express');
var router = express.Router();
var RecommendationController = require('../controllers/RecommendationController');
var AuthController = require("../controllers/AuthController");

router.get('/:userId', AuthController.isAuthenticated, RecommendationController.getRecommendations);

module.exports = router;
