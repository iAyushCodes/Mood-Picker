// Fetching and storing different mood emojis 
const happy = document.getElementById("happy");
const sad = document.getElementById("sad");
const excited = document.getElementById("excited");
const neutral = document.getElementById("neutral");

//Fetching and storing the different view buttons
const daily = document.getElementById("daily-btn");
const weekly = document.getElementById("weekly-btn");
const monthly = document.getElementById("monthly-btn");

// Fetching and storing the moodGrid in which the respective dates and the moods will be appended to
const gridContainer = document.getElementById("moodGrid");

// Storing all the mood emojis in an array 
const allMoods = [happy, sad, excited, neutral];

// Loading data from local storage to have the past data as well
let data = loadData();

// Looping over the emoji array to add "CLICK" event listener to each of the emojis
allMoods.forEach((mood) => {
  mood.addEventListener("click", function () {

    // Storing the clicked mood emoji
    const clicked = this.textContent;

    // Storing the present day date
    const today = new Date().toLocaleDateString().split("T")[0];

    // If the present date is already present in the data which we loaded in the code above then we will display that the mood has already been submitted by the user to prevent overwriting of the mood
    const found = data.find((obj) => obj["date"] === today);
    if (found) {

      // Fetching the card in which the emojis are present
      const card = document.getElementById("card");

      // Creating a div element which will contain the text displaying that mood has already been submitted
      const display = document.createElement("div");
      display.innerHTML = `<span class="text-red-500 flex justify-center w-auto">Already Submitted Your Mood</span>`;

      // Appending the above created div into the card
      card.appendChild(display);

      // After 2 seconds the added text will be removed automatically
      setTimeout(() => {
        display.remove();
      }, 2000);
      return;
    }

    // If the present day date is not present in the data loaded, it means that the user is yet to submit the mood, in that case the present date and the selected mood will be added to the data in the local storage
    data = [...data, { date: today, mood: clicked }];

    // Updating the moodLogs in the local storage
    localStorage.setItem("moodLogs", JSON.stringify(data));

    // Creating a div element and adding the text displaying that the user has successfully submitted the mood
    const display = document.createElement("div");
    display.innerHTML = `<span class="text-red-500 flex justify-center w-auto">Mood Submitted</span>`;

    // Appending the display text to the card containing the mood emojis
    card.appendChild(display);

    // After 2 seconds the added text will be removed
    setTimeout(() => {
      display.remove();
    }, 2000);
  });
});

// Creating a function to load data from the localStorage If there is no key named moodLogs in the localStorage, it means that the user has entered first time to the website then a dummy data will be loaded for project demonstration purposes
function loadData() {

  // Returning the mood entries stored in localStorage and if not present then returning dummy data
  return (
    JSON.parse(localStorage.getItem("moodLogs")) || [
      { date: "19/02/2025", mood: "😄" },
      { date: "20/02/2025", mood: "😐" },
      { date: "21/02/2025", mood: "😔" },
      { date: "22/02/2025", mood: "🥳" },
      { date: "23/02/2025", mood: "😄" },
      { date: "24/02/2025", mood: "😐" },
      { date: "25/02/2025", mood: "😔" },
      { date: "26/02/2025", mood: "🥳" },
      { date: "27/02/2025", mood: "😄" },
      { date: "28/02/2025", mood: "😐" },
      { date: "01/03/2025", mood: "😔" },
      { date: "02/03/2025", mood: "🥳" },
      { date: "03/03/2025", mood: "😄" },
      { date: "04/03/2025", mood: "😐" },
      { date: "05/03/2025", mood: "😔" },
      { date: "06/03/2025", mood: "🥳" },
      { date: "07/03/2025", mood: "😄" },
      { date: "08/03/2025", mood: "😐" },
      { date: "09/03/2025", mood: "😔" },
      { date: "10/03/2025", mood: "🥳" },
      { date: "11/03/2025", mood: "😄" },
      { date: "12/03/2025", mood: "😐" },
      { date: "13/03/2025", mood: "😔" },
      { date: "14/03/2025", mood: "🥳" },
      { date: "15/03/2025", mood: "😄" },
      { date: "16/03/2025", mood: "😐" },
      { date: "17/03/2025", mood: "😔" },
      { date: "18/03/2025", mood: "🥳" },
      { date: "19/03/2025", mood: "😐" },
    ]
  );
}

// Adding a click event listener to the daily button
daily.addEventListener("click", function () {

  // Loading the data from localStorage
  const data = loadData();

  // Stroing the present day date
  const today = new Date().toLocaleDateString().split("T")[0];

  // Fetching that object from the data (which we took from localStorage) which has the present day date
  const result = data.filter((obj) => obj["date"] === today);

  // Emptying the contents of gridContainer so that desired timeline is not written again and again but instead of it, it is displayed fresh.
  gridContainer.innerHTML = "";

  // Displaying today's mood entered by the user
  // result will be an array having only one object inside it corresponding to the present day date and that will be accessed using index 0
  gridContainer.innerHTML = `
    <div class="p-4 rounded-lg shadow-md text-center text-gray">
      <span id="dateDisplay" class="w-40">${result[0].date} ${result[0].mood}</span>
    </div>
    `;
  
});

// Adding click event listener to the Weekly Button
weekly.addEventListener("click", function () {

  // Loading data from localStorage
  const data = loadData();

  // Setting a limit so that the while loop only runs for a fixed number of time to fetch 7 days from the answer array which will be populated in the below written code
  let limit = 7;

  // Iterating from 1 to 7 therefere initialised i as 1
  let i = 1;

  // Creating an answer array which will have all the objects corresponding to the past 7 day mood entries
  let answer = [];

  // Loop will run 7 times and enter the past 7 day mood entries
  while (limit > 0) {

    // The array will be populated with mood entries starting from the end of the index because the most recent entry will be present at the last index of the data Array
    answer.push(data[data.length - i]);

    // Incrementing i to traverse the data array from reverse side
    i++;

    // Decrementing limit to ensure that the while loop terminated at the required moment
    limit--;
  }

   // Emptying the contents of gridContainer so that desired timeline is not written again and again but instead of it, it is displayed fresh.
  gridContainer.innerHTML = "";

  // Traversing the answer array which was populated above and creating a span element for each object in the answer array
  answer.forEach((obj) => {

    // Creating a span element to write the date and mood
    const spanElement = document.createElement("span");

    // Adding styling to the span element
    spanElement.classList = "p-4 w-full rounded-lg shadow-md text-center text-gray";

    // Adding date and mood to the span element  
    spanElement.textContent = `${obj.date} ${obj.mood}`;

    // Appending the span element so that it is displayed on the webpage
    gridContainer.appendChild(spanElement);
  });
});

// Adding a click event listener to the monthly view button
monthly.addEventListener("click", function () {

  // Loading the data from localStorage
  const data = loadData();

  // Setting a limit so that the while loop only runs for a fixed number of time to fetch 30 days from the answer array which will be populated in the below written code
  let limit = 30;

  // Iterating from 1 to 30 therefere initialised i as 1
  let i = 1;

  // Creating an answer array which will have all the objects corresponding to the past 30 day mood entries
  let answer = [];

  // Loop will run 30 times and enter the past 30 day mood entries
  while (limit > 0) {

    // The array will be populated with mood entries starting from the end of the index because the most recent entry will be present at the last index of the data Array
    answer.push(data[data.length - i]);

    // incrementing i to traverse the data array from the reverse side
    i++;

    // Decrementing limit so that the while loop terminates at the required moment
    limit--;
  }

  // Emptying the contents of gridContainer so that desired timeline is not written again and again but instead of it, it is displayed fresh.
  gridContainer.innerHTML = "";

  // Traversing the answer array which was populated above and creating a span element for each object in the answer array
  answer.forEach((obj) => {

    // Creating a span element to write the date and mood
    const spanElement = document.createElement("span");

    // Adding styling to the span element
    spanElement.classList = "p-4 w-full rounded-lg shadow-md text-center text-gray";

    // Adding date and mood to the span element  
    spanElement.textContent = `${obj.date} ${obj.mood}`;

    // Appending the span element so that it is displayed on the webpage
    gridContainer.appendChild(spanElement);
  });
});
