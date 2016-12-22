var express = require("express");
var router = express.Router();
var todos = require("./../Todo")
var todoItems = require("./../TodoItems");


router.get("/gettodos", function(req,res){
  var user = req.query.user;

  todos.getTodoListByUserId(user).then(function(cb){
    res.send(cb);
  });


  //var response = {
    //id: 5,
    //name: "oskar"
  //}
  //res.send(response);

});

router.post("/gettodos", function(req, res){
  var user = req.body.user;

});



module.exports = router;
