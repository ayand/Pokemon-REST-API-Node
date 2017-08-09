const elasticsearch = require('elasticsearch');
const Pokemon = require('./Pokemon_Mongo');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

Pokemon.find(function(error, pokemon) {
    if (error) {
        throw new Error("Could not find the Pokémon");
    }
    if (!pokemon) {
        throw new Error("Could not find the Pokémon");
    }
    var bulkPokemon = [];
    pokemon.forEach(item => {
        bulkPokemon.push({
          index: {
            _index: 'pokemon',
            _type: 'character',
            _id: item.id
          }
        });

        var anItem = {
            id: item.id,
            ndex: item.ndex,
            forme: item.forme,
            species: item.species,
            type1: item.type1,
            type2: item.type2,
            ability1: item.ability1,
            ability2: item.ability2,
            abilityH: item.abilityH,
            hp: item.hp,
            attack: item.attack,
            defense: item.defense,
            spattack: item.spattack,
            spdefense: item.spdefense,
            speed: item.speed,
            eggGroup1: item.eggGroup1,
            eggGroup2: item.eggGroup2,
            percentMale: item.percentMale,
            percentFemale: item.percentFemale
        }

        bulkPokemon.push(anItem);
    });

    esClient.bulk({body: bulkPokemon}).then(response => {
        console.log('Done');
        let errorCount = 0;
        response.items.forEach(item => {
          if (item.index != null && item.index.error != null) {
            console.log(item.index.error);
            errorCount += 1;
          }
        });
        console.log(errorCount);
    }).catch(console.err);
})
