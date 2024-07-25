// Get all the screen elements
const leftscreens = document.querySelectorAll('[id="screen1"]');
const rightscreens = document.querySelectorAll('[id="screen2"]');

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");

const billingToggle = document.getElementById("billingToggle");
const planOptions = document.querySelectorAll(".plan-option");

const monthlyPrices = {
  arcade: "$9/mo",
  advanced: "$12/mo",
  pro: "$15/mo",
};
const yearlyPrices = {
  arcade: "$90/yr",
  advanced: "$120/yr",
  pro: "$150/yr",
};
function updatePrices(isYearly) {
  planOptions.forEach((option) => {
    const planName = option.querySelector("input").value;
    const priceElement = option.querySelector("p");
    const label = option.querySelector("label");

    if (isYearly) {
      priceElement.textContent = yearlyPrices[planName];

      let freeMonthsElement = label.querySelector(".free-months");

      if (!freeMonthsElement) {
        freeMonthsElement = document.createElement("p");
        freeMonthsElement.className =
          "free-months text-sm text-Purplish-blue mt-1";

        freeMonthsElement.textContent = "2 months free";
      }
      label.appendChild(freeMonthsElement);
    } else {
      priceElement.textContent = monthlyPrices[planName];
      let freeMonthsElement = label.querySelector(".free-months");
      if (freeMonthsElement) {
        freeMonthsElement.remove();
      }
    }
  });
}
let currentScreenIndex = 0;

function showScreen(index) {
  console.log(currentScreenIndex);
  console.log(leftscreens);
  console.log(rightscreens);
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

billingToggle.addEventListener("change", function () {
  updatePrices(this.checked);
});
// Initialize the first screen

showScreen(currentScreenIndex);
updatePrices(billingToggle.checked);
