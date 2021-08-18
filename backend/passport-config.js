var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
//let Note = require('./models/note');
//let Admin=require('./models/admin');
//let Coach=require('./models/coach');

passport.use('local',new LocalStrategy({
    usernameField:'email',
    passwordField:'password'
},
    function (username, password, done) {
        User.findOne({ email: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));


passport.serializeUser(function(user, done) {
    console.log("from passport config "+user._id);
    done(null, user._id);
  });
  
  passport.deserializeUser(function(id, done) {
    console.log("from passport config deserialize"+id);
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  /*passport.use('localNote',new LocalStrategy({
    titleField:'title'
},
    function (title, done) {
        Admin.findOne({ title }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.isValid(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));*/


