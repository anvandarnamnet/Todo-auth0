var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var mongoose = require('mongoose');
var todos = require(__dirname + "/../Todo.js");
var todoItems = require(__dirname + "/../TodoItems");

// the enviroment for the login and the authentication
var env = {
  AUTH0_CLIENT_ID: 'PzwLG899qFespCmk7RjoYR3pVeTpKkKD',
  AUTH0_DOMAIN: 'oskar.eu.auth0.com',
  AUTH0_CALLBACK_URL: 'https://fathomless-bayou-11388.herokuapp.com/callback'
};

// setup our database connection
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://oskar:oskar@ds041432.mlab.com:41432/todolistapps");

// Get all the todolists assigned to a user and show the homepage.
router.get('/', ensureLoggedIn, function(req, res, next) {
  console.log(req.user);
  var todo = todos.getTodoListByUserId(req.user.id);
  todo.then(function(myTodos){
    res.render('pages/index', {quot: myTodos, user: req.user});
  });

});


// get the add-todo view
router.get('/addtodo', ensureLoggedIn, function(req, res){
  res.render('pages/addtodo', {user: req.user})
});

// add a new todolist.
router.post('/addtodo', ensureLoggedIn, function(req,res){
  var description = req.body.desc;
  var date = req.body.date;
  var addTodo = todos.addTodoListByUserId(req.user.id, description, date);
  addTodo.then(function(cb){
    console.log(cb);
    res.redirect('/');
  })
});


// show the login page
router.get('/login', function(req, res){
    res.render('pages/login', { env: env });
  });

// logout the user and redirect to home
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


// show the add todo item page.
router.get("/addtodoitem/:id", ensureLoggedIn, function(req,res){
  res.render("pages/addTodoItem", {listId: req.params.id, user:req.user})
});

// add a todo item into a todolist
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

// delete a todo-item
router.get("/delete-todo-item/:id/:todoId", ensureLoggedIn, function(req, res, next){
    todoItems.removeTodoById(req.params.todoId);
    res.redirect("/list/" + req.params.id);
});

// show a todolist based on its id
router.get("/list/:id", ensureLoggedIn, function(req,res){
  var id = req.params.id;
  var todo = todoItems.getTodosByListId(id, req.user.id);
  todo.then(function(cb){
    res.render("pages/todoPage", {quot: cb, user:req.user, listId: id});
  })
});

// delete a todolist
router.get("/delete-todo/:id", ensureLoggedIn, function(req, res, next){
    todos.removeTodoListByTodoId(req.params.id);
    res.redirect("/");
});

// the callback router.
router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/');
  });


module.exports = router;
