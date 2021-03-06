var elasticsearch = require('../elasticsearch/elasticsearchClient');

module.exports.pokemonSearch = function(req, res, next) {
    var searchTerm = req.query.term;
    var body = {
      size: 999,
      from: 0,
      query: {
        multi_match: {
            query: searchTerm,
            fields: ['species', 'forme', 'type1', 'type2', 'ability1',
                'ability2', 'abilityH', 'eggGroup1', 'eggGroup2'],
            fuzziness: 0
        }
      }
    };
    console.log('Search term: ' + searchTerm);
    elasticsearch.search({ index: 'pokemon', body: body }).then(function(pokemon) {
        var finalAnswer = pokemon.hits.hits.filter(function(d) {
            return d._score > 2;
        }).map(function(d) {
            console.log(d);
            return d._source;
        });
        console.log("Final answer: ");
        console.log(finalAnswer);
        finalAnswer.sort(function(a, b) {
            var ndexComparison = a.ndex - b.ndex;
            if (ndexComparison == 0) {
                return a.id - b.id;
            }
            return ndexComparison;
        })
        return res.status(200).send(finalAnswer);
    }).catch(function(error) {
        console.log(error);
        return res.status(400).send({ 'error': 'Could not find the Pokémon' })
    })
}
