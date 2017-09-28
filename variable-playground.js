var person ={
  name: 'Uffe',
  age: 35
};

function updatePerson(obj){
  obj.age=49;
}

updatePerson(person);
console.log(person);
