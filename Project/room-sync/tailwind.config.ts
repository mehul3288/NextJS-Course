import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./providers/**/*.{js,ts,jsx,tsx,mdx}",
    "./services/**/*.{js,ts,jsx,tsx,mdx}",
    "./utils/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#004ac6",
        "on-primary": "#ffffff",
        "primary-container": "#2563eb",
        "on-primary-container": "#eeefff",
        "secondary": "#006c49",
        "on-secondary": "#ffffff",
        "secondary-container": "#6cf8bb",
        "surface": "#faf8ff",
        "surface-container-low": "#f3f3fe",
        "surface-container": "#ededf9",
        "surface-container-high": "#e7e7f3",
        "surface-container-lowest": "#ffffff",
        "surface-container-highest": "#e1e2ed",
        "on-surface": "#191b23",
        "on-surface-variant": "#434655",
        "outline": "#737686",
        "outline-variant": "#c3c6d7",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",
        "background": "#faf8ff",
        "on-background": "#191b23",
        "inverse-surface": "#2e3039",
        "inverse-on-surface": "#f0f0fb",
        "inverse-primary": "#b4c5ff",
        "tertiary": "#ab0b1c",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#cf2c30",
        "on-tertiary-container": "#ffecea",
      },
      spacing: {
        "xs": "0.25rem",   // 4px
        "sm": "0.5rem",    // 8px
        "md": "1rem",      // 16px
        "lg": "1.5rem",    // 24px
        "xl": "2rem",      // 32px
        "2xl": "3rem",     // 48px
        "gutter": "1.5rem",
        "container-margin": "2rem",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      fontSize: {
        "display": ["36px", { lineHeight: "44px", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["28px", { lineHeight: "36px", letterSpacing: "-0.01em", fontWeight: "600" }],
        "headline-md": ["20px", { lineHeight: "28px", fontWeight: "600" }],
        "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "label-md": ["14px", { lineHeight: "20px", fontWeight: "500" }],
        "label-sm": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "headline-md": ["Inter", "sans-serif"],
        "body-lg": ["Inter", "sans-serif"],
        "body-md": ["Inter", "sans-serif"],
        "body-sm": ["Inter", "sans-serif"],
        "label-md": ["Inter", "sans-serif"],
        "label-sm": ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
