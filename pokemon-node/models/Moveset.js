var mongoose = require('../db/mongoose');

var movesetSchema = mongoose.Schema({
    method_full: { type: String, required: true },
    move: { type: Array, required: true },
    pokemon: { type: Number, required: true },
    method: { type: String, required: true },
    move_index: { type: Number, required: true }
})

var MovesetModel = mongoose.model('Moveset', movesetSchema);
module.exports = MovesetModel;
