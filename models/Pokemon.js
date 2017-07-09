var mongoose = require('../db/mongoose');

var pokemonSchema = mongoose.Schema({
    id: { type: Number, required: true },
    ndex: { type: Number,required: true },
    forme: { type: String, required: true },
    forme: {
        type: String, required: true
    },
    species: {
        type: String, required: true
    },
    type1: {
        type: String, required: true
    },
    type2: {
        type: String, required: true
    },
    ability1: {
        type: String, required: true
    },
    ability2: {
        type: String, required: true
    },
    abilityH: {
        type: String, required: true
    },
    hp: {
        type: Number, required: true
    },
    attack: {
        type: Number, required: true
    },
    defense: {
        type: Number, required: true
    },
    spattack: {
        type: Number, required: true
    },
    spdefense: {
        type: Number, required: true
    },
    speed: {
        type: Number, required: true
    },
    eggGroup1: {
        type: String, required: true
    },
    eggGroup2: {
        type: String, required: true
    }
});

var PokemonModel = mongoose.model('Pokemon', pokemonSchema);
module.exports = PokemonModel;
