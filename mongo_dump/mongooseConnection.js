var mongoose = require('mongoose');

//mongoose.connect('mongodb://ayan_das:sik26gudu@ds153392.mlab.com:53392/heroku_f92tgxkj');
mongoose.connect('mongodb://localhost/pokemon')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connection made!")
});


module.exports = mongoose;

/*var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://ayan_das:sik26gudu@ds153392.mlab.com:53392/heroku_f92tgxkj';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  db.close();
});*/
