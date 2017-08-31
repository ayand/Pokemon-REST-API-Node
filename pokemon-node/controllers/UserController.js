var User = require("../models/User");
var bcrypt = require('bcrypt-nodejs');
var jwt = require("jsonwebtoken");

module.exports.signUp = function(req, res, next) {
    var user = req.body;
    User.findOne({ username: req.body.username }, function(mistake, foundUser) {
        if (mistake) {
            return res.status(500).send({ 'error': 'Error in checking for existing user' })
        }
        if (foundUser) {
            return res.status(422).send({ 'error': 'A user with this username already exists' })
        }
        bcrypt.genSalt(5, function(err, salt) {
            if (err) {
                return res.status(500).send({ 'error': 'Error in registering user' });
            }
            if (!salt) {
                return res.status(400).send({ 'error': 'Error in registering user' });
            }
            bcrypt.hash(user.password, salt, null, function(error, hashedPassword) {
                if (error) return res.status(500).send({ 'error': 'Error in registering user' });
                if (!hashedPassword) return res.status(400).send({ 'error': 'Error in registering user' });
                user.token = jwt.sign(user, 'app_secret');
                var newUser = new User({
                    username: user.username,
                    password: hashedPassword,
                    token: user.token
                });
                newUser.save(function(mistake, theUser) {
                    if (mistake) return res.status(500).send({ 'error': 'Error in registering user' });
                    if (!theUser) return res.status(400).send({ 'error': 'Error in registering user' });
                    return res.status(200).send(theUser);
                })
            })
        })
    })    
}
