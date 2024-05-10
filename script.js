// Pegar os elementos do HTML
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// Carregar as tarefas do armazenamento local quando a página é carregada
document.addEventListener("DOMContentLoaded", getLocalTodos);

// Quando clicar queria uma tarefa
todoButton.addEventListener("click", addTodo);

//  Quando clicar apaga ou marca como concluido
todoList.addEventListener("click", deleteCheck);

// Escolher o filtro
filterOption.addEventListener("change", filterTodo);

// Função para adicionar uma nova tarefa
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div"); // Cria um novo elemento div
    todoDiv.classList.add("todo"); // Adiciona a classe "todo" ao div
    const newTodo = document.createElement("li"); // Cria um novo elemento li
    newTodo.innerText = todoInput.value; // Define o texto do li como o valor do input
    newTodo.classList.add("todo-item"); // Adiciona a classe "todo-item" ao li
    todoDiv.appendChild(newTodo); // Adiciona o li ao div

    // Salva no armazenamento local
    saveLocalTodos(todoInput.value);
    
    // botão de completar
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>'; // Ícone de certo
    completedButton.classList.add("complete-btn"); // Adiciona a classe "complete-btn" ao botão
    todoDiv.appendChild(completedButton); // Adiciona o botão ao div

    // botão de apagar
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>'; // Ícone de lixo
    trashButton.classList.add("trash-btn"); // Adiciona a classe "trash-btn" ao botão
    todoDiv.appendChild(trashButton); // Adiciona o botão ao div
    
    todoList.appendChild(todoDiv); // Adiciona o div à lista de tarefas
    todoInput.value = ""; // Limpa o valor do input
}

// Função para apagar ou marcar como completo uma tarefa
function deleteCheck(e) {
    const item = e.target; // Elemento clicado

    // Deleta a tarefa se o botão dp lixo for clicado
    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement; // Obtém o div pai do botão
        todo.classList.add("slide"); // Adiciona a classe "slide" para animação de saída

        // Remove a tarefa do armazenamento local após a animação
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove(); // Remove a tarefa da lista após a animação
        });
    }

    // Marca a tarefa como completo se o botão de feito for clicado
    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement; // Obtém o div pai do botão
        todo.classList.toggle("completed"); // Alterna a classe "completed" para marcar como completo
    }
}

// Função para filtrar as tarefas
function filterTodo(e) {
    const todos = todoList.childNodes; // Obtém todos os elementos da lista de tarefas
    todos.forEach(function(todo) { // Itera sobre cada tarefa
        switch(e.target.value) { // Verifica o valor do filtro selecionado
            case "all": 
                todo.style.display = "flex"; // Mostra todas as tarefas
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex"; // Mostra as tarefas completas
                } else {
                    todo.style.display = "none"; // Esconde as tarefas incompletas
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex"; // Mostra as tarefas incompletas
                } else {
                    todo.style.display = "none"; // Esconde as tarefas completas
                }
                break;
        }
    });
}

// Função para salvar as tarefas no armazenamento local
function saveLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) { // Verifica se não há nenhuma tarefa salva
        todos = []; // Inicializa um array vazio
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Obtém as tarefas salvas do armazenamento local
    }
    todos.push(todo); // Adiciona o novo todo ao array
    localStorage.setItem("todos", JSON.stringify(todos)); // Salva as tarefas no armazenamento local
}

// Função para obter as tarefas do armazenamento local
function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) { // Verifica se não há nenhuma tarefa salva
        todos = []; // Inicializa um array vazio
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Obtém as tarefas do armazenamento local
    }
    todos.forEach(function(todo) { // Itera sobre cada tarefa
        const todoDiv = document.createElement("div"); // Cria um novo elemento div
        todoDiv.classList.add("todo"); // Adiciona a classe "todo" ao div
        const newTodo = document.createElement("li"); // Cria um novo elemento li
        newTodo.innerText = todo; // Define o texto do li como o todo
        newTodo.classList.add("todo-item"); // Adiciona a classe "todo-item" ao li
        todoDiv.appendChild(newTodo); // Adiciona o li ao div

        // Criação do botão de completar
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>'; // Ícone de certo
        completedButton.classList.add("complete-btn"); // Adiciona a classe "complete-btn" ao botão
        todoDiv.appendChild(completedButton); // Adiciona o botão ao div

        // botão de apagar
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>'; // Ícone de lixo
        trashButton.classList.add("trash-btn"); // Adiciona a classe "trash-btn" ao botão
        todoDiv.appendChild(trashButton); // Adiciona o botão ao div
        todoList.appendChild(todoDiv); // Adiciona o div à lista de todos
    });
}

// Função para remover uma tarefa do armazenamento local
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) { // Verifica se não há nenhuma tarefa salvo
        todos = []; // Inicializa um array vazio
    } else {
        todos = JSON.parse(localStorage.getItem("todos")); // Obtém as tarefas salvas do armazenamento local
    }

    const todoIndex = todo.children[0].innerText; // Obtém o texto do primeiro filho do div (li)
    todos.splice(todos.indexOf(todoIndex), 1); // Remove a tarefa do array
    localStorage.setItem("todos", JSON.stringify(todos)); // Atualiza as tarefas+ no armazenamento local
}