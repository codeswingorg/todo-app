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

const handleNonActiveTodoBoxClick = (e) => {
  const todoName = document.querySelector(".todo-name");

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
  const todoName = document.querySelector(".todo-name").value;
  const todoDescription = document.querySelector(".todo-description").value;
  const todoDueDate = document.querySelector(".due-date").value;

  const todo = {
    title: todoName,
    description: todoDescription,
    dueDate: todoDueDate,
  };

  // Do not trigger anything if fields are empty
  if (!todoName || !todoDescription || !todoDueDate) {
    return;
  }

  activeTodos.push(todo);

  todoForm.reset();
  dueDateField.classList.add("hidden");
  selectDueDate.classList.remove("hidden");
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

// Event handlers

nonActiveTodoBox.addEventListener("click", handleNonActiveTodoBoxClick);
selectDueDate.addEventListener("click", handleDatePickerClick);
todoForm.addEventListener("submit", handleFormSubmission);
closeForm.addEventListener("click", handleCloseForm);
// On page init
setGreeting();
