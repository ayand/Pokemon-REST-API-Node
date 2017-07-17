var express = require('express');
var router = express.Router();
var PokemonController = require('../controllers/PokemonController');

router.get('/', PokemonController.findAllPokemon);

router.get('/:id', PokemonController.findPokemonById);

router.get('/formes/:ndexNumber', PokemonController.findPokemonFormes);

router.get('/type/:type', PokemonController.findPokemonByType);

router.get('/type1/:type1/type2/:type2', PokemonController.findPokemonByTwoTypes);

module.exports = router;
