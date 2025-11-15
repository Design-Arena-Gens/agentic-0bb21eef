import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          950: "#040608"
        }
      },
      fontFamily: {
        display: ["'Space Grotesk'", "system-ui", "sans-serif"],
        body: ["'Inter'", "system-ui", "sans-serif"]
      },
      backgroundImage: {
        aurora: "radial-gradient(circle at top, rgba(59,130,246,0.4), transparent 55%), radial-gradient(circle at bottom, rgba(236,72,153,0.35), transparent 60%)"
      }
    }
  },
  plugins: []
};

export default config;
