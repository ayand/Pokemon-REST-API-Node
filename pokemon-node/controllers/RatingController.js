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

module.exports.getRating = function(req, res, next) {
    var userID = parseInt(req.query.userId);
    var pokemonID = parseInt(req.query.pokemonId);
    Rating.findOne({ userId: userID, pokemonId: pokemonID }, function(error, rating) {
        if (error) {
            return res.status(500).send({ 'error': 'Could not retrieve rating' });
        }
        if (!rating) {
            var defaultRating = { userId: userID, pokemonId: pokemonID, rating: 3 };
            console.log('Could not find rating')
            return res.status(200).send(defaultRating);
        }
        return res.status(200).send(rating);
    })
}

module.exports.updateRating = function(req, res, next) {
    var userID = req.body.userId;
    var pokemonID = req.body.pokemonId;
    var theRating = req.body.rating;
    Rating.findOne({ userId: userID, pokemonID: pokemonID }, function(error, existingRating) {
        if (error) {
            return res.status(500).send({ 'error': 'Could not start the process of updating the user\'s rating' });
        }
        if (!existingRating) {
            var newRating = {
                userId: userID,
                pokemonId: pokemonID,
                rating: theRating
            }
            newRating.save(function(err, rating) {
                if (err) {
                    return res.status(500).send({ 'error': 'Could not put in the user\'s new rating' });
                }
                if (!rating) {
                    return res.status(400).send({ 'error': 'New rating was not deposited' })
                }
                return res.status(200).send(rating);
            })
        }
        existingRating.rating = theRating;
        existingRating.save(function(err, rating) {
            if (err) {
                return res.status(500).send({ 'error': 'Could not update the user\'s rating' });
            }
            if (!rating) {
                return res.status(400).send({ 'error': 'Rating was not updated' })
            }
            return res.status(200).send(rating);
        })
    })
}
