// Get all the screen elements
const leftscreens = document.querySelectorAll('[id="screen1"]');
const rightscreens = document.querySelectorAll('[id="screen2"]');
console.log(leftscreens);
console.log(rightscreens);
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

let currentScreenIndex = 0;

function showScreen(index) {
  console.log(currentScreenIndex);
  leftscreens.forEach((screen, i) => {
    if (i === index) {
      screen.classList.remove("hidden");
    } else {
      screen.classList.add("hidden");
    }
  });
  rightscreens.forEach((screen, i) => {
    if (i === index) {
      screen.classList.remove("hidden");
    } else {
      screen.classList.add("hidden");
    }
  });

  // Update button visibility
  prevButton.style.display = index === 0 ? "none" : "block";
  nextButton.style.display =
    index === rightscreens.length - 1 ? "none" : "block";
}

function nextScreen() {
  if (currentScreenIndex < rightscreens.length - 1) {
    currentScreenIndex++;

    showScreen(currentScreenIndex);
  }
}

function prevScreen() {
  if (currentScreenIndex > 0) {
    currentScreenIndex--;
    showScreen(currentScreenIndex);
  }
}

// Event listeners for next and previous buttons
nextButton.addEventListener("click", nextScreen);
prevButton.addEventListener("click", prevScreen);

// Initialize the first screen
showScreen(currentScreenIndex);
