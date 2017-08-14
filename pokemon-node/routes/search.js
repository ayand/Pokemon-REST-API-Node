var express = require('express');
var router = express.Router();
var PokemonSearchController = require('../controllers/PokemonSearchController');
var MoveSearchController = require('../controllers/MoveSearchController');

router.get('/pokemon/', PokemonSearchController.pokemonSearch);

router.get('/moves/', MoveSearchController.moveSearch);

module.exports = router;
