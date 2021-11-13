var mainApp = {};
(function(){
var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("stay");
          mainContainer.style.display = "";
        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("login.html");
        }
      });
}
    
init();

mainApp.logout = logtout;
})();

const todoinput = document.querySelector(".to-doinput");
const todobutton = document.querySelector(".to-dobutton");
const todolist = document.querySelector(".to-dolist");
const todof = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener('click',buttonfunc);
todolist.addEventListener('click',checkdelete);
todof.addEventListener('click',filter);

function buttonfunc(event){
    //prevent form from submitting
    event.preventDefault();

    if(todoinput.value.length == 0){
        // if no task is entered
        alert("Please Enter a Task")
    }
    else{
        // a todo div
    const tododiv = document.createElement("div");
    tododiv.classList.add("todo");
    
    //creating a list
    const newtodo = document.createElement("li");
    newtodo.innerText = todoinput.value;
    //save to local storage
    savelocal(todoinput.value);
    newtodo.classList.add("todo-item");
    tododiv.appendChild(newtodo);
    
    //clear todoinpval
    todoinput.value = "";

    
    
    //creating a check button
    const completedbutton = document.createElement("button");
    completedbutton.innerHTML = '<i class = "fas fa-check"></i>';
    completedbutton.classList.add("complete-btn");
    tododiv.appendChild(completedbutton);

    //creating a dustbin
    const trashbutton = document.createElement("button");
    trashbutton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashbutton.classList.add("trash-btn");
    tododiv.appendChild(trashbutton);

    //append to list
    todolist.appendChild(tododiv);

    }

    
}


function checkdelete(e){
    const item = e.target;

    if(item.classList[0] == "trash-btn"){
        const todo = item.parentElement;
        //For animation
        todo.classList.add("fall");

        remLocalTodos(todo);

        todo.addEventListener("transitionend", function(){
          todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filter(e){
    const todos = todolist.childNodes;
    todos.forEach(function(todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function savelocal(todo){
    let ftodo;
    if(localStorage.getItem('ftodo') === null){
        ftodo = [];
    }
    else{
        ftodo = JSON.parse(localStorage.getItem('ftodo'));
    }

    ftodo.push(todo);
    localStorage.setItem("ftodo",JSON.stringify(ftodo));
}

function remLocalTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
  
  
  function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");
      //Creating a  list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoinput.value = "";
      //Creating Completed Button
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("complete-btn");
      todoDiv.appendChild(completedButton);
      //Creating trash button
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);
      //add the final Todo
      todolist.appendChild(todoDiv);
    });
  }