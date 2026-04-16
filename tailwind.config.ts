import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#08111D",
        surface: "#101A2B",
        surface2: "#142138",
        line: "#223451",
        lineStrong: "#39557D",
        text: "#F4F7FB",
        muted: "#97A8C2",
        brand: "#FF5A6F",
        brandStrong: "#FF6D63",
        accent: "#62E6C7",
        accentSoft: "#183A38",
        success: "#8DF2B4",
      },
      boxShadow: {
        card: "0 24px 60px rgba(1, 6, 16, 0.42)",
        glow: "0 0 0 1px rgba(98, 230, 199, 0.18), 0 14px 44px rgba(98, 230, 199, 0.08)",
      },
      backgroundImage: {
        glow:
          "radial-gradient(circle at top, rgba(98, 230, 199, 0.15), transparent 30%), radial-gradient(circle at bottom right, rgba(255, 90, 111, 0.14), transparent 24%)",
      },
    },
  },
  plugins: [],
};

export default config;
