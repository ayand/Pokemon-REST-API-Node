const elasticsearch = require('elasticsearch');
const Move = require('./Move');

const esClient = new elasticsearch.Client({
  host: '127.0.0.1:9200',
  log: 'error'
});

Move.find(function(error, moves) {
    if (error) {
        throw new Error("Could not find the moves");
    }
    if (!moves) {
        throw new Error("Could not find the moves");
    }
    var bulkMoves = [];
    moves.forEach(item => {
        bulkMoves.push({
          index: {
            _index: 'move',
            _type: 'character',
            _id: item.id
          }
        });

        var anItem = {
            id: item.id,
            category: item.category,
            pp: item.pp,
            description: item.description,
            power: item.power,
            move: item.move,
            priority: item.priority,
            crit: item.crit,
            zEffect: item.zEffect,
            type: item.type,
            accuracy: item.accuracy
            }

        bulkMoves.push(anItem);
    });

    esClient.bulk({body: bulkMoves}).then(response => {
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
