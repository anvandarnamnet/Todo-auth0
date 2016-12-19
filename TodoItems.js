var mongoose = require("mongoose");

var todoSchema = mongoose.Schema({
  description: {type: String, required: true},
  date: {type: Date, required: true},
  user: {type: String, required: true},
  listId: {type: String, required: true},
  createdAt: {type: Date, default:Date.now}
});


var todo = mongoose.model("todoItems", todoSchema);
module.exports = todo;

module.exports.addTodoByListId = function(description, date, user, listId){
  return new Promise(function(resolve, reject){
    var newTodo = new todo({
      description: description,
      date: date,
      user: user,
      listId: listId
    });

    newTodo.save(function(err){
      if(err){
        console.log(err);
        return err;

      } else{
        resolve(newTodo);
    }
  });
  })
}

module.exports.removeTodoById = function(id){
  todo.remove({_id: id}, function(err){
   console.log("sucess!");
 });
}

module.exports.getTodosByListId = function(id, user){
  return new Promise (function(resolve, reject){

    var query = todo.find({user: user, listId: id});

    query.exec(function(err, todos){
     if(err){
       return console.log(err);
     }

     resolve(todos);

    });
  });
}
