var express = require("express");
var router = express.Router();
var todos = require("./../Todo")
var todoItems = require("./../TodoItems");

// the api class, Beta ediition.

router.get("/gettodos", function(req,res){
  var user = req.query.user;

  todos.getTodoListByUserId(user).then(function(cb){
    res.send(cb);
  });
});

router.get("/gettodoitems", function(req,res){
  var listId = req.query.list;
  todoItems.getTodosByListId(listId).then(function(cb){
    res.send(cb);
  })
});

router.get("/deletetodolist",function(req,res){
  var id = req.query.list;
  todos.removeTodoListByTodoId(id);
  var response =[];
  res.send(response);


})

router.post("/addtodolist", function(req,res){
  //var date = req.body.date;
  //var desc = req.body.desc;
  //var user = req.body.user;
  //todos.addTodoListByUserId(user, desc, date).then(function(cb){
    var response = [];
    console.log(req.body);
    res.send(response);
  //})

});

router.post("/gettodos", function(req, res){
  var user = req.body.user;

});



module.exports = router;
