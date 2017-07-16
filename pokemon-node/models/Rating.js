var mongoose = require('../db/mongoose');

var ratingSchema = mongoose.Schema({
    userId: { type: Number, required: true },
    pokemonId: { type: Number, required: true },
    rating: { type: Number, required: true }
})

var RatingModel = mongoose.model('Rating', ratingSchema);
module.exports = RatingModel;
