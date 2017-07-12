var Rating = require("../models/Rating");

module.exports.postRatings = function(req, res, next) {
    Rating.collection.insert(req.body.ratings, function(err, docs) {
        if (err) {
            return res.status(500).send({ 'error': 'Could not post ratings' });
        }
        if (!docs) {
            return res.status(400).send({ 'error': 'Post did not work' });
        }
        Rating.find(function(err, ratings) {
            if (err) {
                return res.status(500).send({ 'error': 'Could not get all ratings' });
            }
            if (!ratings) {
                return res.status(400).send({ 'error': 'Could not find the ratings in the database' });
            }
            return res.status(200).send(ratings);
        })
    })
}
