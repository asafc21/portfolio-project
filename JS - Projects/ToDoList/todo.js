document.addEventListener("DOMContentLoaded", function () {
  const addform = document.querySelector("form");
  const list = document.querySelector(".todos");
  let storage = JSON.parse(localStorage.getItem("list")) || [];
  const resetBtn = document.getElementById("btn");

  const createTemplate = (todo) => {
    if (!storage.includes(todo)) {
      const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${todo}</span>
          <i class="bi bi-trash delete" onclick="removeTodo(this)"></i>
        </li>`;
      list.innerHTML += html;
      storage.push(todo);
      localStorage.setItem("list", JSON.stringify(storage));
    } else {
      alert("you are trying to add the same task!");
    }
  };

  const renderStoredItems = () => {
    list.innerHTML = "";
    storage.forEach((item) => {
      const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <span>${item}</span>
          <i class="bi bi-trash delete" onclick="removeTodo(this)"></i>
        </li>`;
      list.innerHTML += html;
    });
  };

  addform.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = addform.querySelector(".add").value.trim();

    if (todo.length) {
      createTemplate(todo);
      addform.reset();
    }
  });

  list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      e.target.parentElement.remove();
      const deletedTodo = e.target.previousElementSibling.textContent;
      storage = storage.filter((item) => item !== deletedTodo);
      localStorage.setItem("list", JSON.stringify(storage));
    }
  });

  if (storage.length) {
    renderStoredItems();
  }

  resetBtn.addEventListener("click", () => {
    storage = [];
    localStorage.removeItem("list");
    list.innerHTML = "";
    addform.reset();
  });
});
