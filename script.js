const timeOfDay = document.querySelector(".timeOfDay");
const nonActiveTodoBox = document.querySelector(".not-active-box");
const selectDueDate = document.querySelector(".todo-due-date-container");
const todoForm = document.querySelector(".active-todo-box");
const closeForm = document.querySelector(".close-btn");
const activeTodos = [];
const completedTodos = [];
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

  displayTodos();
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

// Display todos from activeTodods array

const displayTodos = () => {
  const todosDiv = document.querySelector(".todos");

  // Remove all existing todo elements
  while (todosDiv.firstChild) {
    todosDiv.removeChild(todosDiv.firstChild);
  }

  activeTodos.forEach((currentTodo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

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
      const SvgDateIcon = `
      <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      class="w-6 h-6"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>`;

      todoDueDateElement.innerHTML = SvgDateIcon;
      const dueDateElement = document.createElement("span");
      dueDateElement.textContent = currentTodo.dueDate;
      todoDueDateElement.appendChild(dueDateElement);
      todoInfoDiv.appendChild(todoDueDateElement);
    }

    todoDiv.appendChild(todoInfoDiv);
    todosDiv.appendChild(todoDiv);
  });
};

// randomId generator

const randomId = () => {
  return Math.ceil(new Date().getTime() + Math.random() * 9 + 1);
};

// Event handlers

nonActiveTodoBox.addEventListener("click", handleNonActiveTodoBoxClick);
selectDueDate.addEventListener("click", handleDatePickerClick);
todoForm.addEventListener("submit", handleFormSubmission);
closeForm.addEventListener("click", handleCloseForm);

// On page init

setGreeting();
