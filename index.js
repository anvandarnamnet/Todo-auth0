var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var user = require('./routes/user');
var routes = require('./routes/index')
var cookieParser = require('cookie-parser');
var session = require('express-session')
var ua = require('universal-analytics');


var strategy = new Auth0Strategy({
    domain:       'oskar.eu.auth0.com',
    clientID:     'PzwLG899qFespCmk7RjoYR3pVeTpKkKD',
    clientSecret: 'aMKnSLF-dUpe9Xqc2Sa-RJopDD1wyQoQ8tOPD4V0r6VsgZQVjI57cb-aPFsWHbP7',
    callbackURL:  'https://fathomless-bayou-11388.herokuapp.com/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });

  express.use(ua.middleware("UA-89238325-1", {cookieName: '_ga'}));

  passport.use(strategy);

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

var app = express();

app.set('port', (process.env.PORT || 5000));



// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', routes);
app.use('/user', user);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
