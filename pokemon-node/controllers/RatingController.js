var Rating = require("../models/Rating");

module.exports.postRatings = function(req, res, next) {
    var ratings = req.body.ratings.map(function(d) {
        return {
            userId: req.body.userId,
            pokemonId: d.pokemonId,
            rating: d.rating
        }
    });
    Rating.collection.insert(ratings, function(err, docs) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not post ratings' });
        }
        if (!docs) {
            return res.status(400).send({ 'error': 'Post did not work' });
        }
        res.status(200).send({ 'success': 'Ratings were successfully posted' });
    })
}
