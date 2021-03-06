var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var user = require('./routes/user');
var routes = require('./routes/index')
var cookieParser = require('cookie-parser');
var session = require('express-session')
var ua = require('universal-analytics');
var jwt = require('express-jwt');
var api = require("./routes/api");

// for a secured api
var jwtCheck = jwt({
  secret: 'aMKnSLF-dUpe9Xqc2Sa-RJopDD1wyQoQ8tOPD4V0r6VsgZQVjI57cb-aPFsWHbP7',
  audience: 'PzwLG899qFespCmk7RjoYR3pVeTpKkKD'
});


// for the authentication. The login page
var strategy = new Auth0Strategy({
    domain:       'oskar.eu.auth0.com',
    clientID:     'PzwLG899qFespCmk7RjoYR3pVeTpKkKD',
    clientSecret: 'aMKnSLF-dUpe9Xqc2Sa-RJopDD1wyQoQ8tOPD4V0r6VsgZQVjI57cb-aPFsWHbP7',
    callbackURL:  'https://fathomless-bayou-11388.herokuapp.com/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  });

  passport.use(strategy);



  //serializeUser and deserializeUser
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

// the express-app variable
var app = express();
// for google analysis
app.use(ua.middleware("UA-89238325-1", {cookieName: '_ga'}));

// set the port
app.set('port', (process.env.PORT || 5000));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//some standard setup with static maps and json parser
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// our session is saved as a cookie
app.use(cookieParser());
app.use(session({
  secret: 'shhhhhhhhh',
  resave: true,
  saveUninitialized: true
}));

// init our passport-auth0
app.use(passport.initialize());
app.use(passport.session());

// redirect the '/' to routes
app.use('/', routes);

// redirect the '/user' to our user router
app.use('/user', user);

// secure the api
app.use('/api', jwtCheck);

// route the api
app.use('/api', api);


// start to listen for connections
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
