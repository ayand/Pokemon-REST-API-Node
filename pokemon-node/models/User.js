var mongoose = require('../db/mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    token: { type: String, required: true }
});

userSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'userNo' });

var UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
