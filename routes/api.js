var express = require("express");
var router = express.Router();
var todos = require("./../Todo")
var todoItems = require("./../TodoItems");


router.get("/gettodos", function(req,res){
  var user = req.query.user;

  var todos = todos.getTodoListByListId(user);
  todos.then(function(cb){
    res.send(response);
  });

});

router.post("/gettodos", function(req, res){
  var user = req.body.user;

});



module.exports = router;
