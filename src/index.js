// Get all the screen elements
const leftscreens = document.querySelectorAll('[id="screen1"]');
const rightscreens = document.querySelectorAll('[id="screen2"]');
const planNamed = document.getElementById("plan-name");

// Query all buttons by class
const prevButtons = document.querySelectorAll(".prevButton");
const nextButtons = document.querySelectorAll(".nextButton");
const billingToggle = document.getElementById("billingToggle");
const planOptions = document.querySelectorAll(".plan-option");
const changeButton = document.getElementById("changeButton");
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
    const planElement = planNamed.querySelector("p");
    if (isYearly) {
      priceElement.textContent = yearlyPrices[planName];

      let freeMonthsElement = label.querySelector(".free-months");

      if (!freeMonthsElement) {
        freeMonthsElement = document.createElement("p");
        freeMonthsElement.className =
          "free-months text-sm text-Purplish-blue mt-1";

        freeMonthsElement.textContent = "2 months free";
        label.appendChild(freeMonthsElement);
      }
    } else {
      priceElement.textContent = monthlyPrices[planName];
      let freeMonthsElement = label.querySelector(".free-months");
      if (freeMonthsElement) {
        freeMonthsElement.remove();
      }
    }
  });
}

function updatePlanName() {
  const selectedPlan = document.querySelector(".plan-option input:checked");
  const planNamedp = planNamed.querySelector(".planNamed");
  const planPrice = document.getElementById("planPrice");
  console.log(planNamedp);
  console.log(planPrice);
  if (selectedPlan) {
    const planName = selectedPlan.value;
    console.log(planName);
    const isYearly = billingToggle.checked;
    if (planNamedp) {
      planNamedp.textContent = `${
        planName.charAt(0).toUpperCase() + planName.slice(1)
      }(${isYearly ? "Yearly" : "Monthly"})`;
      planPrice.textContent = `${
        isYearly ? yearlyPrices[planName] : monthlyPrices[planName]
      }`;
    }
  }
}

let currentScreenIndex = 0;

function showScreen(index) {
  leftscreens.forEach((screen, i) => {
    screen.classList.toggle("hidden", i !== index);
  });
  rightscreens.forEach((screen, i) => {
    screen.classList.toggle("hidden", i !== index);
  });

  // Update button visibility
  prevButtons.forEach((button) => {
    button.style.display = index === 0 ? "none" : "block";
  });
  nextButtons.forEach((button) => {
    button.style.display = index === rightscreens.length - 1 ? "none" : "block";
  });
}

function nextScreen() {
  if (currentScreenIndex < rightscreens.length - 1) {
    currentScreenIndex++;
    showScreen(currentScreenIndex);
    updatePlanName();
  }
}

function prevScreen() {
  if (currentScreenIndex > 0) {
    currentScreenIndex--;
    showScreen(currentScreenIndex);
    updatePlanName();
  }
}

// Add event listeners to each button
nextButtons.forEach((button) => {
  button.addEventListener("click", nextScreen);
});
prevButtons.forEach((button) => {
  button.addEventListener("click", prevScreen);
});

billingToggle.addEventListener("change", function () {
  updatePrices(this.checked);
});
changeButton.addEventListener("click", () => {
  currentScreenIndex = 1;
  showScreen(currentScreenIndex);
});
// Initialize the first screen
showScreen(currentScreenIndex);
updatePrices(billingToggle.checked);
updatePlanName();
