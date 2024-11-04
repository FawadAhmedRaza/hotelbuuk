/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.{js,ts}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        "10vh": "10vh",
        "25vh": "25vh",
        "50vh": "50vh",
        "75vh": "75vh",
      },

      fontSize: {
        "42fs": "42px",
        "15fs": "15px", // Consolidated fontSize definitions
      },
      colors: {
        primary: "#852169",
        secondary: "rgba(17, 34, 17,0.74)",
        tertiary: "#fef5fc",
        quaternary: "#fdeafa",
        "custom-black": "#1C1B1F",
        "custom-neutral": "#79747E",
        "section-bg": "#F0EFEF",
        "custom-grey": "#51677E",
        "custom-grey-100": "#D9D9D9",
        "datepicker-bg": "#FFFFFF",
        "datepicker-text": "#1F2937",
      },
      lineHeight: {
        "50ld": "50px",
      },
      screens: {
        "min-450": { min: "450px" },
        'min-500': { min: '500px' },
        'min-900': { min: '900px' },
        'min-1100': { min: '1100' },
        'min-1100': { min: '1100px' },
        "2xl-custom": { min: "1500px" },
      },
      boxShadow: {
        "custom-card-shadow": "0px 4px 23px 0px rgba(0, 0, 0, 0.15)",
        "custom-shadow-lg": "0px 4px 23px 0px #00000026",
        "custom-shadow-sm": "0px 3px 10px 0px #111B2329",
        "custom-shadow-xs": "0px 1px 4px 0px #111B2329",
        "custom-shadow-md": "0px 0px 16px 0px rgba(0, 0, 0, 0.25)",
      },
      backgroundImage: {
        hero: "url('/assets/images/hero.png')",
        banner: "url('/assets/images/banner.png')",
        footer: "url('/assets/images/footer-bg.jpeg')",
        terms: "url('/assets/images/terms-and-cond.png')",
        impressum: "url('/assets/images/impressum.png')",
        privacy: "url('/assets/images/privacy-policy.png')",
        about: "url('/assets/images/about.png')",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)", "sans-serif"],
        dmSans: ["var(--font-dmSans)", "sans-serif"],
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        lemonMilk: ["var(--font-lemonMilk)", "sans-serif"],
        helvetica: ["var(--font-helvetica)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
