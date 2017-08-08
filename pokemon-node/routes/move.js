var express = require('express');
var router = express.Router();
var MoveController = require('../controllers/MoveController');
var MovesetController = require('../controllers/MovesetController');

router.get('/', MoveController.findAllMoves);

router.get('/:id', MoveController.findMove);

router.get('/learners/:id', MovesetController.findLearners);

module.exports = router;
