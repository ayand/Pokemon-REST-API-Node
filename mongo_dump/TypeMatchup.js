var Sequelize = require('sequelize');
var sequelize = require('./sqlDB');

var TypeMatching = sequelize.define('TypeMatching', {
    defenseType1: {
        type: Sequelize.STRING
    },
    defenseType2: {
        type: Sequelize.STRING
    },
    attackType: {
        type: Sequelize.STRING
    },
    effect: {
        type: Sequelize.DOUBLE
    }
}, {
    tableName: "TypeChart",
    timestamps: false
})

module.exports = TypeMatching;
