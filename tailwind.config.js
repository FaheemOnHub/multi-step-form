/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "Marine-blue": "hsl(213, 96%, 18%)",
        "Purplish-blue": "hsl(243, 100%, 62%)",
        "Pastel-blue": "hsl(228, 100%, 84%)",
        "Light-blue": "hsl(206, 94%, 87%)",
        "Strawberry-red": "hsl(354, 84%, 57%)",
        "Cool-gray": "hsl(231, 11%, 63%)",
        "Light-gray": "hsl(229, 24%, 87%)",
        Magnolia: "hsl(217, 100%, 97%)",
        Alabaster: "hsl(231, 100%, 99%)",
        White: "hsl(0, 0%, 100%)",
      },
      backgroundImage: {
        "hero-sidebar": 'url("../assets/images/bg-sidebar-desktop.svg")',
      },
      font: {
        "ubuntu-bold": 'url("../a',
      },
    },
  },
  plugins: [],
};
