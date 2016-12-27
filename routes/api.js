var express = require("express");
var router = express.Router();
var todos = require("./../Todo")
var todoItems = require("./../TodoItems");

// the api class, Beta ediition.

router.post("/gettodos", function(req,res){
  var user = req.body[0];

  todos.getTodoListByUserId(user).then(function(cb){
    res.send(cb);
  });
});

router.post("/gettodoitems", function(req,res){
  var listId = req.body[0];

  todoItems.getTodosByListId(listId).then(function(cb){
    res.send(cb);
  })
});

router.post("/deletetodolist",function(req,res){
  var id = req.body[0];

  todos.removeTodoListByTodoId(id);

  var response =[];
  res.send(response);
});

router.post("/deletetodoitem", function(req,res){
  var id = req.body[0];
  todoItems.removeTodoById(id);
  
  var response = [];
  res.send(response)
});

router.post("/addtodoitem", function(req,res){
  var desc = req.body[0]
  var listId = req.body[1];
  var userId = req.body[2];

  todoItems.addTodoByListId(desc, "2000-01-01", userId, listId).then(function(cb){
    var response = [];
    res.send(response);
  });
});

router.post("/addtodolist", function(req,res){
  var date = req.body[1];
  var desc = req.body[0];
  var user = req.body[2];

  todos.addTodoListByUserId(user, desc, date).then(function(cb){
    var response = [];
    res.send(response);
  });
});


module.exports = router;
