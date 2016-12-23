var mongoose = require("mongoose");

// the shema of the todolists
var todoSchema = mongoose.Schema({
  description: {type: String, required: true},
  date: {type: Date, required: true},
  user: {type: String, required: true},
  createdAt: {type: Date, default:Date.now}
});

// model our schema and make it available
var todo = mongoose.model("todos", todoSchema);
module.exports = todo;

// remove a list by it's id.
module.exports.removeTodoListByTodoId = function(id){
  todo.remove({_id: id}, function(err){
   console.log("sucess!");
 });
}

// add a new todolist
module.exports.addTodoListByUserId = function(user, titel, date){
  return new Promise (function(resolve, reject){

    var newTodo = new todo({
      description: titel,
      date: date,
      user: user
    });

    newTodo.save(function(err){
      if(err){
        console.log(err);
        return err;

      } else{
        resolve(newTodo);
    }
  });
});
}

// ge a todolist by it's id.
module.exports.getTodoListByListId = function(id){
  return new Promise (function(resolve, reject){
    var query = todo.find({_id: id});
    query.exec(function(err, todos){
     if(err){
       return console.log(err);
     }

     resolve(todos);
    });
  });
}

// get all the list assigned to a user.
module.exports.getTodoListByUserId = function(id){
  return new Promise (function(resolve, reject){
    var query = todo.find({user: id});
    query.exec(function(err, todos){
     if(err){
       return console.log(err);
     }

     resolve(todos);
    });
  });
}
