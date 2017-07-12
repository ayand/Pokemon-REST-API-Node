var mongoose = require('../db/mongoose');

var userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
});

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
