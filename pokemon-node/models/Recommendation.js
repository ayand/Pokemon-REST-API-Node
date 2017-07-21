var mongoose = require('../db/mongoose');

var recommendationSchema = mongoose.Schema({
  userId: { type: Number },
  pokemonId: { type: Number },
  rating: { type: Number }
});

var RecommendationModel = mongoose.model('reccomendation', recommendationSchema);
module.exports = RecommendationModel;
