var Pokemon = require('../models/Pokemon');

module.exports.findAllPokemon = function(req, res, next) {
    Pokemon.find(function(err, pokemon) {
        if (err) {
            return res.status(400).send({ 'error': 'Could not retrieve the Pokémon' })
        } else {
            pokemon.sort(function(a, b) {
                var ndexComparison = a.ndex - b.ndex;
                if (ndexComparison == 0) {
                    return a.id - b.id;
                }
                return ndexComparison;
            })
            return res.status(200).send(pokemon);
        }
    })
};

module.exports.findPokemonById = function(req, res, next) {
    Pokemon.findOne({ id: req.params.id }, function(err, pokemon) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not retrieve the Pokémon' })
        } else {
            if (!pokemon) {
                return res.status(404).send({ 'error': 'Could not find a Pokémon with this ID' })
            }
            pokemon.sort(function(a, b) {
                var ndexComparison = a.ndex - b.ndex;
                if (ndexComparison == 0) {
                    return a.id - b.id;
                }
                return ndexComparison;
            })
            return res.status(200).send(pokemon);
        }
    })
}

module.exports.findPokemonFormes = function(req, res, next) {
    Pokemon.find({ ndex: req.params.ndexNumber }, function(err, pokemon) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not retrieve the Pokémon' })
        } else {
            if (!pokemon) {
                return res.status(404).send({ 'error': 'Could not find Pokémon formes with this Pokédex number' })
            }
            pokemon.sort(function(a, b) {
                var ndexComparison = a.ndex - b.ndex;
                if (ndexComparison == 0) {
                    return a.id - b.id;
                }
                return ndexComparison;
            })
            return res.status(200).send(pokemon);
        }
    });
}

module.exports.findPokemonByType = function(req, res, next) {
    Pokemon.find({ $or: [ { type1: req.params.type }, { type2: req.params.type } ] }, function(err, pokemon) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not retrieve the Pokémon' });
        } else {
          if (!pokemon) {
              return res.status(404).send({ 'error': 'Could not find Pokémon with this type' })
          }
          pokemon.sort(function(a, b) {
              var ndexComparison = a.ndex - b.ndex;
              if (ndexComparison == 0) {
                  return a.id - b.id;
              }
              return ndexComparison;
          })
          return res.status(200).send(pokemon);
        }
    })
}

module.exports.findPokemonByTwoTypes = function(req, res, next) {
    Pokemon.find({ $or: [ { type1: req.params.type1, type2: req.params.type2 },
      { type1: req.params.type2, type2: req.params.type1 } ] }, function(err, pokemon) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not retrieve the Pokémon' });
        } else {
          if (!pokemon) {
              return res.status(404).send({ 'error': 'Could not find Pokémon with this type combination' })
          }
          pokemon.sort(function(a, b) {
              var ndexComparison = a.ndex - b.ndex;
              if (ndexComparison == 0) {
                  return a.id - b.id;
              }
              return ndexComparison;
          })
          return res.status(200).send(pokemon);
        }
      })
}
