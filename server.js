// Basic server
// https://swedinserver-todo-api.herokuapp.com/
var express=require('express');
var app=express();
var PORT = process.env.PORT || 3000;


var todos=[{
  id: 1,
  description: 'Meet mom for lunch',
  completed: false
},{
  id:2,
  description: 'Go to market',
  completed: false
},{
  id:3,
  description: 'Call my boss',
  completed:true
}];

app.get('/', function(req, res){
  res.send('Todo API Root');
});

// get todos
app.get('/todos', function(req,res){
  res.json(todos);
});

// get todo/:id - individual item
app.get('/todos/:id', function(req,res){
  //:id is available here
  var todoId=parseInt(req.params.id, 10);
  var matchedTodo;

  todos.forEach(function(todo){
    if(todoId===todo.id){
      matchedTodo=todo;
    }
  });

  if(matchedTodo){
      res.json(matchedTodo);
  } else{
      res.status(404).send();
  }


  // Min lite bättre lösning, snabbare
  // var foundId=false;
  // for(var i=0; i<todos.length;i++){
  //   if(todos[i].id==todoId){
  //     res.json(todos[i]);
  //     foundId=true;
  //   }
  // }
  // if(foundId==false){
  //   res.status(405).send();
  // }
  //res.send('Asking for a todo with id of ' + req.params.id);
});


app.listen(PORT, function(){
  console.log('Express listening on port ' + PORT + '!');
});

// Data routes
