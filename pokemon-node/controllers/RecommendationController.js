var Recommendation = require('../models/Recommendation');
var Pokemon = require('../models/Pokemon');

module.exports.getRecommendations = function(req, res, next) {
     Recommendation.find({ "userId": req.body.userId }, function(err, recos) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not retrieve your recommendations' })
        }
        if (!recos) {
            return res.status(400).send({ 'error': 'Could not find recommendations for you' })
        }
        recos.sort(function(a, b) {
            return a.pokemonId - b.pokemonId;
        })
        var pokemonIds = recos.map(function(d) {
            return d.pokemonId;
        })
        Pokemon.find({ 'id': { $in: pokemonIds } }, function(error, pokemon) {
            if (error) {
                return res.status(500).send({ 'error': 'Could not retrieve your recommendations' })
            }
            if (!pokemon) {
                return res.status(400).send({ 'error': 'Could not find recommendations for you' })
            }
            pokemon.sort(function(a, b) {
                return a.id - b.id;
            });
            var response = recos.map(function(d, i) {
                return {
                    "pokemon": pokemon[i],
                    "rating": (d.rating <= 5.0) ? d.rating : 5.0
                };
            })
            return res.status(200).send(response);
        })
    })
}
