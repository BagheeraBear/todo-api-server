// Basic server
// https://swedinserver-todo-api.herokuapp.com/
var express=require('express');
// middleware: body-parser
var bodyParser = require('body-parser');
// Underscore.js - Refactor get-todos-by-id-method, and post-todos
var _ = require('underscore');

var app=express();
var PORT = process.env.PORT || 3000;
var todos=[];
var todoNextId = 1;

app.use(bodyParser.json());


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

  var matchedTodo=_.findWhere(todos, {id:todoId} );

  // todos.forEach(function(todo){
  //   if(todoId===todo.id){
  //     matchedTodo=todo;
  //   }
  // });

  if(matchedTodo){
      res.json(matchedTodo);
  }
  else{
      res.status(404).send();
  }

});
// Underscore
// where_.where(list, properties)
// Looks through each value in the list, returning an array of all the
// values that contain all of the key-value pairs listed in properties.

// _.where(listOfPlays, {author: "Shakespeare", year: 1611});
// => [{title: "Cymbeline", author: "Shakespeare", year: 1611},
//     {title: "The Tempest", author: "Shakespeare", year: 1611}]



// POST http-method /todos
// refactor with underscore, added validation
app.post('/todos', function(req, res){
  // Use _.pick to only pick description and completed

  var body=_.pick(req.body, 'description', 'completed');

  if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length===0){
    return res.status(400).send();
  }

  //Remove spaces
  body.description = body.description.trim();
  // add id field
  body.id=todoNextId++;
  // push body into array
  todos.push(body);

  // Test: console.log('description: ' + body.description);

  res.json(body);
});

app.listen(PORT, function(){
  console.log('Express listening on port ' + PORT + '!');
});

// Data routes
