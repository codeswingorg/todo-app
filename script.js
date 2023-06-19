const timeOfDay = document.querySelector(".timeOfDay");
const nonActiveTodoBox = document.querySelector(".not-active-box");
const selectDueDate = document.querySelector(".todo-due-date-container");
const todoForm = document.querySelector(".active-todo-box");
const todos = [];
const completedTodos = [];
const date = new Date();
let currentTime = date.getHours();

/*
    Check what time of the day
        * if it is under 12PM, display good morning
        * if it is between 12PM and 6PM, display good afternoon
        * if it is after 6PM, display good night
 */

if (currentTime < 12) {
  timeOfDay.textContent = "morning";
} else if (currentTime < 18) {
  timeOfDay.textContent = "afternoon";
} else {
  timeOfDay.textContent = "night";
}

// Todo creation box section

nonActiveTodoBox.addEventListener("click", (e) => {
  const todoForm = document.querySelector(".active-todo-box");
  const todoName = document.querySelector(".todo-name");

  nonActiveTodoBox.classList.add("hidden");
  todoForm.classList.remove("hidden");
  todoName.focus();
});

selectDueDate.addEventListener("click", () => {
  const dueDateField = document.querySelector(".due-date");
  dueDateField.classList.remove("hidden");
  selectDueDate.classList.add("hidden");
  dueDateField.focus();
});

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(todoForm);
  for (const [name, value] of formData.entries()) {
    console.log(name, value);
  }
});
