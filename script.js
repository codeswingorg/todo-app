const timeOfDay = document.querySelector(".timeOfDay");

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
