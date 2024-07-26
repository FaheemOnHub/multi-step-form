// Get all the screen elements
const leftscreens = document.querySelectorAll('[id="screen1"]');
const rightscreens = document.querySelectorAll('[id="screen2"]');
const planNamed = document.getElementById("plan-name");
const servicePricing = document.querySelectorAll(".servicePricing");
const totalList = document.querySelectorAll(".total");
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
const monthlyService = {
  onlineService: "$1/mo",
  largeStorage: "$2/mo",
  customService: "$2/mo",
};
const yearlyService = {
  onlineService: "$10/yr",
  largeStorage: "$20/yr",
  customService: "$20/yr",
};

let totalCost = 0;
function calculateTotal(isYearly) {
  totalCost = 0;
  const selectedPlan = document.querySelector(".plan-option input:checked");

  if (selectedPlan) {
    const planName = selectedPlan.value;
    totalCost += isYearly
      ? parseInt(yearlyPrices[planName].slice(1))
      : parseInt(monthlyPrices[planName].slice(1));
  }

  servicePricing.forEach((service) => {
    const id = service.querySelector("input").id;
    const checked = service.querySelector("input").checked;

    if (checked) {
      if (isYearly) {
        totalCost += parseInt(yearlyService[id].slice(1));
      } else {
        totalCost += parseInt(monthlyService[id].slice(1));
      }
    }
  });

  updateTotalDisplay(isYearly);
}

function updateTotalDisplay(isYearly) {
  const totalElement = document.querySelector(".total-value");
  const totalNameElement = document.querySelector(".total-name");

  if (totalElement && totalNameElement) {
    totalElement.textContent = isYearly
      ? `$${totalCost}/yr`
      : `$${totalCost}/mo`;
    totalNameElement.textContent = isYearly
      ? "Total (per year)"
      : "Total (per month)";
  }
}
function servicePrice(isYearly) {
  servicePricing.forEach((service) => {
    const id = service.querySelector("input").id;

    const planName = service.querySelector(".serviceCost");

    if (isYearly) {
      planName.textContent = yearlyService[id];
    } else {
      planName.textContent = monthlyService[id];
    }
  });
  calculateTotal(isYearly);
}
function updatePrices(isYearly) {
  planOptions.forEach((option) => {
    const planName = option.querySelector("input").value;
    const priceElement = option.querySelector("p");
    const label = option.querySelector("label");
    // const planElement = planNamed.querySelector("p");
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
  calculateTotal(isYearly);
}

function updatePlanName() {
  const selectedPlan = document.querySelector(".plan-option input:checked");
  const planNamedp = planNamed.querySelector(".planNamed");
  const planPrice = document.getElementById("planPrice");

  if (selectedPlan) {
    const planName = selectedPlan.value;

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
  calculateTotal(billingToggle.checked);
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

planOptions.forEach((option) => {
  option.querySelector("input").addEventListener("change", () => {
    updatePlanName();
    calculateTotal(billingToggle.checked);
  });
});

servicePricing.forEach((service) => {
  service.querySelector("input").addEventListener("change", () => {
    calculateTotal(billingToggle.checked);
  });
});

billingToggle.addEventListener("change", function () {
  updatePrices(this.checked);
  servicePrice(this.checked);
});
changeButton.addEventListener("click", () => {
  currentScreenIndex = 1;
  showScreen(currentScreenIndex);
});
// Initialize the first screen
showScreen(currentScreenIndex);
updatePrices(billingToggle.checked);
updatePlanName();
calculateTotal(billingToggle.checked);
