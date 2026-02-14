

// Get todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Render todos
function renderTodos() {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  const filteredTodos = todos.filter((todo) => {
    if (currentFilter === "completed") return todo.completed;
    if (currentFilter === "pending") return !todo.completed;
    return true; // all
  });

  filteredTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="todo-content">
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="todo-action">
        <button data-index="${index}" class="action-btn completed-btn">
          <i class="fas ${todo.completed ? "fa-rotate-left" : "fa-check"}"></i>
        </button>
        <button data-index="${index}" class="action-btn delete-btn">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `;
    todoList.appendChild(li);
  });

  addTodoActionListeners();
}

// Add new todo
function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    input.value = "";
    saveTodos();
    renderTodos();
  }
}

// Toggle todo completed
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Add event listeners to dynamically created buttons
function addTodoActionListeners() {
  document.querySelectorAll(".completed-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      toggleTodo(index);
    });
  });

  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.dataset.index;
      deleteTodo(index);
    });
  });
}

// Filter functionality
document.querySelectorAll(".filter-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    currentFilter = btn.dataset.filter;

    document.querySelectorAll(".filter-btn").forEach((b) =>
      b.classList.remove("active")
    );
    btn.classList.add("active");

    renderTodos();
  });
});

// Add todo button
document.getElementById("addTodoBtn").addEventListener("click", addTodo);

// Enter key adds todo
document.getElementById("todoInput").addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTodo();
});

// Initial render
renderTodos();
