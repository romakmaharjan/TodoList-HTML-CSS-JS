document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("myInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");

  // Load todos from localStorage
  loadTodos();

  addBtn.addEventListener("click", addTodoItem);

  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTodoItem();
    }
  });

  function addTodoItem() {
    const inputValue = input.value.trim();

    if (inputValue !== "") {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${inputValue}</span>
        <label>
          <i class="fa-solid fa-square-check"></i>&nbsp;
          <i class="fa-solid fa-trash"></i>
        </label>
      `;
      todoList.appendChild(li);
      input.value = ""; // Clear the input

      // Add event listeners to the new icons
      const checkBtn = li.querySelector(".fa-square-check");
      const deleteBtn = li.querySelector(".fa-trash");

      checkBtn.addEventListener("click", toggleTodoItem);
      deleteBtn.addEventListener("click", deleteTodoItem);

      // Save to localStorage
      saveTodos();
    }
  }

  function toggleTodoItem(event) {
    const item = event.target.closest("li");
    item.classList.toggle("checked");
    // Save to localStorage
    saveTodos();
  }

  function deleteTodoItem(event) {
    const item = event.target.closest("li");
    item.remove();
    // Save to localStorage
    saveTodos();
  }

  function saveTodos() {
    const todos = [];
    todoList.querySelectorAll("li").forEach((li) => {
      todos.push({
        text: li.querySelector("span").textContent,
        completed: li.classList.contains("checked"),
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function loadTodos() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach((todo) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${todo.text}</span>
        <label>
          <i class="fa-solid fa-square-check"></i>&nbsp;
          <i class="fa-solid fa-trash"></i>
        </label>
      `;
      if (todo.completed) {
        li.classList.add("checked");
      }
      todoList.appendChild(li);

      // Add event listeners to the new icons
      const checkBtn = li.querySelector(".fa-square-check");
      const deleteBtn = li.querySelector(".fa-trash");

      checkBtn.addEventListener("click", toggleTodoItem);
      deleteBtn.addEventListener("click", deleteTodoItem);
    });
  }
});
