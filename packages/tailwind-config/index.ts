import type { Config } from "tailwindcss";

const config: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          teal: {
            50: "#E1F5EE",
            500: "#1D9E75",
            700: "#0F6E56",
            900: "#04342C",
          },
          purple: {
            50: "#EEEDFE",
            500: "#7F77DD",
            700: "#534AB7",
          },
        },
        tier: {
          bronze: {
            bg: "#CD7F32",
            text: "#7C4E1F",
          },
          silver: {
            bg: "#94A3B8",
            text: "#334155",
          },
          gold: {
            bg: "#EF9F27",
            text: "#633806",
          },
          platinum: {
            bg: "#7F77DD",
            text: "#3C3489",
          },
        },
        status: {
          success: "#1D9E75",
          warning: "#EF9F27",
          danger: "#E24B4A",
          info: "#378ADD",
        },
      },
      borderRadius: {
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "24px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
