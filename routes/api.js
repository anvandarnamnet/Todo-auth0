var express = require("express");
var router = express.Router();
var todos = require("./../Todo")
var todoItems = require("./../TodoItems");

// the api class, Beta ediition.

router.get("/gettodos", function(req,res){
  var user = req.query.user;

  todos.getTodoListByUserId(user).then(function(cb){ res.send(cb); });
});

router.post("/gettodos", function(req, res){
  var user = req.body.user;

});



module.exports = router;
