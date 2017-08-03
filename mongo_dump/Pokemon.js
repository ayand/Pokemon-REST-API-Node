var Sequelize = require('sequelize');
var sequelize = require('./sqlDB');

var Pokemon = sequelize.define('Pokemon', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    ndex: {
        type: Sequelize.INTEGER
    },
    forme: {
        type: Sequelize.STRING
    },
    species: {
        type: Sequelize.STRING
    },
    type1: {
        type: Sequelize.STRING
    },
    type2: {
        type: Sequelize.STRING
    },
    ability1: {
        type: Sequelize.STRING
    },
    ability2: {
        type: Sequelize.STRING
    },
    abilityH: {
        type: Sequelize.STRING
    },
    hp: {
        type: Sequelize.INTEGER
    },
    attack: {
        type: Sequelize.INTEGER
    },
    defense: {
        type: Sequelize.INTEGER
    },
    spattack: {
        type: Sequelize.INTEGER
    },
    spdefense: {
        type: Sequelize.INTEGER
    },
    speed: {
        type: Sequelize.INTEGER
    },
    eggGroup1: {
        type: Sequelize.STRING
    },
    eggGroup2: {
        type: Sequelize.STRING
    }
}, {
    tableName: "Pokemon",
    timestamps: false
});

module.exports = Pokemon;
