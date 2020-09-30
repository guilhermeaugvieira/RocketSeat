var listElement = document.querySelector("#app ul");
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");

var todos = JSON.parse(localStorage.getItem('listOfTodos')) || [];

renderTodos();

buttonElement.onclick = function(){
    addTodo();}

function renderTodos(){
    listElement.innerHTML = '';
    
    for(todo of todos){
        var todoElement = document.createElement('li');
        var todoText = document.createTextNode(todo);
        var linkExcluir = document.createElement('a');

        var pos = todos.indexOf(todo);
        
        linkExcluir.setAttribute('href','#');
        linkExcluir.setAttribute('onclick','deleteTodo(' + pos + ')');
        linkExcluir.appendChild(document.createTextNode("Excluir"));

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkExcluir);
        listElement.appendChild(todoElement);
    }
}

function addTodo(){
    var todoText = inputElement.value;
    todoText += ' ';

    todos.push(todoText);

    renderTodos();
    saveToStorage();
}

function deleteTodo(pos){
    todos.splice(pos, 1);

    renderTodos();
    saveToStorage();
}

function saveToStorage(){
    localStorage.setItem('listOfTodos',JSON.stringify(todos))
}