var express = require('express');
var router = express.Router();
var PokemonSearchController = require('../controllers/PokemonSearchController');

router.get('/pokemon/', PokemonSearchController.pokemonSearch);

module.exports = router;
