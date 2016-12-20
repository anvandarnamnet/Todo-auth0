var express = require("express");
var router = express.Router();

router.post("/gettodos", function(req,res){
  res.send("HELLO");
})

module.exports = router;
