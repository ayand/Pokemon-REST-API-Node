var Pokemon_Mongo = require('./Pokemon_Mongo');
var fs = require('file-system');

var pokemon = JSON.parse(fs.readFileSync('pokemon.json'));

var modifiedPokemon = pokemon.map(function(p) {
    return {
        id: p.id,
        ndex: p.ndex,
        forme: p.forme,
        species: p.species,
        type1: p.type1,
        type2: p.type2,
        ability1: p.ability1,
        ability2: p.ability2,
        abilityH: p.abilityH,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        spattack: p.spattack,
        spdefense: p.spdefense,
        speed: p.speed,
        eggGroup1: p["egg-group1"],
        eggGroup2: p["egg-group2"],
        percentMale: p["percent-male"],
        percentFemale: p["percent-female"]
    };
});

Pokemon_Mongo.collection.insert(modifiedPokemon, function(err, docs) {
    if (err) {
        console.log(err);
    } else {
        console.log(docs.length + " Pokemon stored");
    }
})
