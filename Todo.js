var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
  description: {type: String, required: true},
  date: {type: Date, required: true},
  user: {type: String, required: true},
  createdAt: {type: Date, default:Date.now}
});

var todo = mongoose.model("todos", todoSchema);
module.exports = todo;

module.exports.removeTodoListByTodoId = function(id){
  todo.remove({_id: id}, function(err){
   console.log("sucess!");
 });
}

module.exports.addTodoListByUserId = function(id, titel, date){
  return new Promise (function(resolve, reject){

    var newTodo = new todo({
      description: titel,
      date: date,
      user: id
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
