var Moveset = require('../models/Moveset');
var Pokemon = require('../models/Pokemon');

module.exports.findLearnset = function(req, res, next) {
    Moveset.find({ pokemon: req.params.id }, function(error, movesets) {
      if (error) {
          res.status(500).send({ "error": "Could not retrieve the move" })
      }
      if (!movesets) {
          res.status(400).send({ "error": "Could not retrieve the move" })
      }
      return res.status(200).send(movesets);
    })
}

module.exports.findLearners = function(req, res, next) {
    Moveset.find({ move_index: req.params.id }, function(err, movesets) {
      if (err) {
          res.status(500).send({ "error": "Could not retrieve the move" })
      }
      if (!movesets) {
          res.status(400).send({ "error": "Could not retrieve the move" })
      }
      var pokemonIDs = movesets.map(function(d) {
          return d.pokemon;
      })
      Pokemon.find({ 'id': { $in: pokemonIDs } }, function(error, pokemon) {
        if (error) {
            res.status(500).send({ "error": "Could not retrieve the move" })
        }
        if (!pokemon) {
            res.status(400).send({ "error": "Could not retrieve the move" })
        }
        return res.status(200).send(pokemon);
      })
    })
}
