var mongoose = require('../db/mongoose');

var moveSchema = mongoose.Schema({
    category: { type: String, required: true },
    pp: { type: Number, required: true },
    description: { type: String, required: true },
    power: { type: Number, required: true },
    move: { type: String, required: true },
    priority: { type: Number, required: true },
    crit: { type: Number, required: true },
    zEffect: { type: String, required: true },
    type: { type: String, required: true },
    id: { type: Number, require: true },
    accuracy: { type: String, required: true }
})

var MoveModel = mongoose.model('Move', moveSchema)
module.exports = MoveModel
