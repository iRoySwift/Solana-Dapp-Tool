import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config = {
  darkMode: "class",
  content: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "../../../packages/common/ui/src/components/**/*.{ts,tsx}",
  ],
  plugins: [tailwindcssAnimate],
} satisfies Config;

export default config;
