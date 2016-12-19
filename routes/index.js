var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var mongoose = require('mongoose');
var todos = require(__dirname + "/../Todo.js");
var todoItems = require(__dirname + "/../TodoItems");
var ua = require('universal-analytics');

var env = {
  AUTH0_CLIENT_ID: 'PzwLG899qFespCmk7RjoYR3pVeTpKkKD',
  AUTH0_DOMAIN: 'oskar.eu.auth0.com',
  AUTH0_CALLBACK_URL: 'https://fathomless-bayou-11388.herokuapp.com/callback'
};

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oskar:oskar@ds041432.mlab.com:41432/todolistapps");

/* GET home page. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/").send()
  var todo = todos.getTodoListByUserId(req.user.id);
  todo.then(function(myTodos){
    res.render('pages/index', {quot: myTodos, user: req.user});
  });

});

router.get('/addtodo', ensureLoggedIn, function(req, res){
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/addtodo").send()
  res.render('pages/addtodo', {user: req.user})
});

router.post('/addtodo', ensureLoggedIn, function(req,res){
  var description = req.body.desc;
  var date = req.body.date;
  var addTodo = todos.addTodoListByUserId(req.user.id, description, date);
  addTodo.then(function(cb){
    console.log(cb);
    res.redirect('/');
  })
});


router.get('/login', function(req, res){
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/login").send()
    res.render('pages/login', { env: env });
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});



router.get("/addtodoitem/:id", ensureLoggedIn, function(req,res){
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/addtodoitem").send()
  res.render("pages/addTodoItem", {listId: req.params.id, user:req.user})
});

router.post("/addtodoitem/:id", ensureLoggedIn, function(req,res){
  var id = req.params.id;
  var description = req.body.desc;
  var date = Date.now();
  var user = req.user.id;

  var todo = todoItems.addTodoByListId(description, date, user, id);
  todo.then(function(cb){
    res.redirect('/list/' + id);
  })

})

router.get("/delete-todo-item/:id", ensureLoggedIn, function(req, res, next){
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/delete-todo-item").send()
    todoItems.removeTodoById(req.params.id);
    res.redirect("/list/" + req.params.id);
});

router.get("/list/:id", ensureLoggedIn, function(req,res){
  var visitor = ua('UA-89238325-1');
  visitor.pageview("/list").send()
  var id = req.params.id;
  var todo = todoItems.getTodosByListId(id, req.user.id);
  todo.then(function(cb){
    res.render("pages/todoPage", {quot: cb, user:req.user, listId: id});
  })
});

router.get("/delete-todo/:id", ensureLoggedIn, function(req, res, next){
    todos.removeTodoListByTodoId(req.params.id);
    res.redirect("/");
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });


module.exports = router;
