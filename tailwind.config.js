/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "870px",
      },
      minHeight: {
        "custom-header": "calc(100vh - 88px)",
        200: "200px",
        300: "300px",
        400: "400px",
        500: "500px",
        600: "600px",
        700: "700px",
        800: "800px",
        900: "800px",
        1000: "1000px",
      },
      zIndex: {
        1: 1,
        5: 5,
        100: 100,
        1000: 1000,
      },
      minWidth: {
        xxs: "288px",
        xs: "320px",
        sm: "384px",
        md: "448px",
        lg: "512px",
        xl: "576px",
      },
      maxWidth: {
        100: "100px",
        200: "200px",
        300: "300px",
        "container-1": "1120px",
        "container-2": "992px",
      },
      colors: {
        "filter-1": "#0096C760",
        "filter-2": "#03055e60",
        "primary-1": "#0096C7",
        "primary-2": "#0077B6",
        "light-1": "#FFFFFF",
        "light-2": "#CCF2F4",
        "dark-1": "#313335",
        "dark-2": "#191919",
        "light-fade": "#FFFFFF30",
        "dark-fade": "#313335b5",
      },
      borderWidth: {
        '16': '16px', 
        '20': '20px', 
      },
    },
  },
  plugins: [],
};
