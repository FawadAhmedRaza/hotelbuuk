/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "42fs": "42px",
      },
      colors: {
        primary: "#852169",
        secondary: "rgba(17, 34, 17,0.74)",
        "custom-black": "#1C1B1F",
        "custom-neutral": "#79747E",
      },
      lineHeight: {
        "50ld": "50px",
      },
      screens: {
        'min-450': { min: '450px' },
        '2xl-custom': { min: '1500px' },
      },
      backgroundImage: {
        hero: "url('/assets/images/hero.png')",
        banner: "url('/assets/images/banner.png')",
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'sans-serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
