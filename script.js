const timeOfDay = document.querySelector(".timeOfDay");
const nonActiveTodoBox = document.querySelector(".not-active-box");
const selectDueDate = document.querySelector(".todo-due-date-container");
const todoForm = document.querySelector(".active-todo-box");
const closeForm = document.querySelector(".close-btn");
const activeTodosDiv = document.querySelector(".activeTodos");
const completedTodosDiv = document.querySelector(".completedTodos");
let activeTodos = [];
let completedTodos = [];
const date = new Date();
const currentTime = date.getHours();

// Display appropriate greeting based on the current time of the day

const setGreeting = () => {
  if (currentTime < 12) {
    timeOfDay.textContent = "morning";
  } else if (currentTime < 18) {
    timeOfDay.textContent = "afternoon";
  } else {
    timeOfDay.textContent = "night";
  }
};

// randomId generator

const randomId = () => {
  return Math.ceil(new Date().getTime() + Math.random() * 9 + 1);
};

// Todo creation box section

const handleNonActiveTodoBoxClick = () => {
  const todoName = document.querySelector(".todo-name-field");
  nonActiveTodoBox.classList.add("hidden");
  todoForm.classList.remove("hidden");
  todoName.focus();
};

const handleDatePickerClick = () => {
  const dueDateField = document.querySelector(".due-date");
  dueDateField.classList.remove("hidden");
  selectDueDate.classList.add("hidden");
  dueDateField.focus();
};

const handleFormSubmission = (e) => {
  e.preventDefault();
  const dueDateField = document.querySelector(".due-date");
  const todoName = document.querySelector(".todo-name-field").value;
  const todoDescription = document.querySelector(
    ".todo-description-field"
  ).value;
  const todoDueDate = document.querySelector(".due-date").value;

  const todo = {
    id: randomId(),
    title: todoName,
    description: todoDescription,
    dueDate: todoDueDate,
  };

  // Do not trigger anything if fields are empty
  if (!todoName) {
    return;
  }

  activeTodos.push(todo);
  todoForm.reset();
  dueDateField.classList.add("hidden");
  selectDueDate.classList.remove("hidden");

  renderTodos(activeTodos, activeTodosDiv);
  displayNumberOfTodos();
};

// If a user closes the form, do some clean up
const handleCloseForm = () => {
  const dueDateField = document.querySelector(".due-date");
  nonActiveTodoBox.classList.remove("hidden");
  todoForm.classList.add("hidden");
  dueDateField.classList.add("hidden");
  selectDueDate.classList.remove("hidden");
  todoForm.reset();
};

// Section Ttitle

const createAndUpdateTheCountElement = (section, todoArray) => {
  const todoCountSpan = document.createElement("span");
  todoCountSpan.textContent = todoArray.length;
  section.appendChild(todoCountSpan);

  section.classList.toggle("hidden", todoArray.length === 0);
};

const displayNumberOfTodos = () => {
  const sectionText = document.querySelectorAll(".sectionText");

  sectionText[0].textContent = "Active Todos - ";
  createAndUpdateTheCountElement(sectionText[0], activeTodos);

  sectionText[1].textContent = "Completed Todos - ";
  createAndUpdateTheCountElement(sectionText[1], completedTodos);
};

const renderTodos = (todos, container) => {
  // Remove all existing todo elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  todos.forEach((currentTodo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = currentTodo.id;

    // create the checkbox element
    const inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    todoDiv.appendChild(inputElement);

    // create the todo data div
    const todoInfoDiv = document.createElement("div");
    todoInfoDiv.classList.add("todo-info");

    // Create the todo title element
    const todoTitle = document.createElement("p");
    todoTitle.classList.add("todo-name");

    todoTitle.textContent = currentTodo.title;
    todoInfoDiv.appendChild(todoTitle);

    // Create the todo description element
    if (currentTodo.description) {
      const todoDescription = document.createElement("p");
      todoDescription.classList.add("todo-description");
      todoDescription.textContent = currentTodo.description;
      todoInfoDiv.appendChild(todoDescription);
    }

    // Create the todo due date element
    if (currentTodo.dueDate) {
      const todoDueDateElement = document.createElement("div");
      todoDueDateElement.classList.add("todo-due-date");

      const dueDateElement = document.createElement("span");
      dueDateElement.textContent = currentTodo.dueDate;
      todoDueDateElement.appendChild(dueDateElement);
      todoInfoDiv.appendChild(todoDueDateElement);
    }

    // Check if we are inside the completed todo div
    if (container === completedTodosDiv) {
      todoTitle.classList.add("markCompleted");
      inputElement.checked = true;
    }

    todoDiv.appendChild(todoInfoDiv);
    container.appendChild(todoDiv);
  });

  displayNumberOfTodos();
};

const toggleTodo = (id, source, destination) => {
  const todoIndex = source.findIndex((todo) => todo.id === id);

  if (todoIndex !== -1) {
    const [todoToMove] = source.splice(todoIndex, 1);
    destination.push(todoToMove);
    return true;
  }

  return false;
};

const toggleTodoCompletion = (e) => {
  const todoId = Number(e.target.parentElement.id);

  if (!toggleTodo(todoId, activeTodos, completedTodos)) {
    toggleTodo(todoId, completedTodos, activeTodos);
  }

  renderTodos(activeTodos, activeTodosDiv);
  renderTodos(completedTodos, completedTodosDiv);
};

// Event handlers

nonActiveTodoBox.addEventListener("click", handleNonActiveTodoBoxClick);
/*
 * We use bubbling here and inside toggleTodoCompletion CB,
 * we simply catch the correct element using the id
 */

activeTodosDiv.addEventListener("change", toggleTodoCompletion);
completedTodosDiv.addEventListener("change", toggleTodoCompletion);
selectDueDate.addEventListener("click", handleDatePickerClick);
todoForm.addEventListener("submit", handleFormSubmission);
closeForm.addEventListener("click", handleCloseForm);

// On page init

setGreeting();
displayNumberOfTodos();
