var Move = require('../models/Move');
var Pokemon = require('../models/Pokemon');

module.exports.findMove = function(req, res, next) {
    Move.findOne({ id: req.params.id }, function(error, move) {
        if (error) {
            res.status(500).send({ "error": "Could not retrieve the move" })
        }
        if (!move) {
            res.status(400).send({ "error": "Could not retrieve the move" })
        }
        return res.status(200).send(move);
    })
}

module.exports.findAllMoves = function(req, res, next) {
    Move.find(function(error, moves) {
      if (error) {
          res.status(500).send({ "error": "Could not retrieve the move" })
      }
      if (!moves) {
          res.status(400).send({ "error": "Could not retrieve the move" })
      }
      return res.status(200).send(moves);
    })
}
