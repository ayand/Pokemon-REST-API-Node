var mongoose = require('./mongooseConnection');

var TypeMatching = mongoose.Schema({
    defenseType1: {
        type: String, required: true
    },
    defenseType2: {
        type: String, required: true
    },
    attackType: {
        type: String, required: true
    },
    effect: {
        type: Number, required: true
    }
})

var MatchupModel = mongoose.model('TypeMatchup', TypeMatching);
module.exports = MatchupModel;
