var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var User = require('../models/User');
var bcrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function(error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, { message: 'No user with this username exists' });
            }
            bcrypt.compare(password, user.password, function(err, passwordMatches) {
                if (err) {
                    return done(error);
                }
                if (!passwordMatches) {
                    return done(null, false, { message: 'Incorrect password' })
                }
                return done(null, user);
            })
        })
    }
));

passport.use(new BearerStrategy(
    function(token, done) {
        User.findOne({ token: token }, function(error, user) {
            if (error) {
                return done(error);
            }
            if (!user) {
                return done(null, false, { message: 'Invalid token' });
            }
            var info = { scope: '*' }
            return done(null, user, info);
        })
    }
));

module.exports.isAuthenticated = passport.authenticate('bearer', { session: false });
module.exports.signIn = passport.authenticate('local', { session: false });
