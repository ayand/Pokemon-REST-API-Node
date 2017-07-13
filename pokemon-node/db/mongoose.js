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
