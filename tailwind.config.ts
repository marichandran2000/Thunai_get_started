import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // Tailwind v4 uses CSS-first configuration via @theme directive in CSS files
  // This config file is provided for tooling compatibility
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
