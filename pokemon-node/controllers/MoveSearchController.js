var elasticsearch = require('../elasticsearch/elasticsearchClient');

module.exports.moveSearch = function(req, res, next) {
  var searchTerm = req.query.term;
  var body = {
    size: 701,
    from: 0,
    query: {
      multi_match: {
          query: searchTerm,
          fields: ['move', 'category', 'type'],
          fuzziness: 0
      }
    }
  };

  elasticsearch.search({ index: 'move', body: body }).then(function(moves) {
      var finalAnswer = moves.hits.hits.filter(function(d) {
          return d._score > 2;
      }).map(function(move) {
          return move._source;
      });
      finalAnswer.sort(function(a, b) {
          return a.id - b.id;
      })
      return res.status(200).send(finalAnswer);
  }).catch(function(error) {
      console.log(error);
      res.status(400).send({ 'error': 'Could not get moves' })
  })
}
