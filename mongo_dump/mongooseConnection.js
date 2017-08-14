var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pokemon')

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connection made!")
});


module.exports = mongoose;
