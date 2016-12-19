$(document).ready(function() {

  var lock = new Auth0Lock('PzwLG899qFespCmk7RjoYR3pVeTpKkKD', 'oskar.eu.auth0.com', {auth: {
         redirectUrl: 'http://localhost:5000/callback'
       , responseType: 'code'
       , params: {
         scope: 'openid name email picture'
       }
     }, closable:false});
lock.show();
});
