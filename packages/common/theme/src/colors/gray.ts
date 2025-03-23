const gray = {
  inlineColors: {
    light: {
      background: "white",
      foreground: "gray-950",
      card: "white",
      "card-foreground": "gray-950",
      popover: "white",
      "popover-foreground": "gray-950",
      primary: "gray-900",
      "primary-foreground": "gray-50",
      secondary: "gray-100",
      "secondary-foreground": "gray-900",
      muted: "gray-100",
      "muted-foreground": "gray-500",
      accent: "gray-100",
      "accent-foreground": "gray-900",
      destructive: "red-500",
      "destructive-foreground": "gray-50",
      border: "gray-200",
      input: "gray-200",
      ring: "gray-950",
    },
    dark: {
      background: "gray-950",
      foreground: "gray-50",
      card: "gray-950",
      "card-foreground": "gray-50",
      popover: "gray-950",
      "popover-foreground": "gray-50",
      primary: "gray-50",
      "primary-foreground": "gray-900",
      secondary: "gray-800",
      "secondary-foreground": "gray-50",
      muted: "gray-800",
      "muted-foreground": "gray-400",
      accent: "gray-800",
      "accent-foreground": "gray-50",
      destructive: "red-900",
      "destructive-foreground": "gray-50",
      border: "gray-800",
      input: "gray-800",
      ring: "gray-300",
    },
  },
  cssVars: {
    light: {
      background: "0 0% 100%",
      foreground: "224 71.4% 4.1%",
      card: "0 0% 100%",
      "card-foreground": "224 71.4% 4.1%",
      popover: "0 0% 100%",
      "popover-foreground": "224 71.4% 4.1%",
      primary: "220.9 39.3% 11%",
      "primary-foreground": "210 20% 98%",
      secondary: "220 14.3% 95.9%",
      "secondary-foreground": "220.9 39.3% 11%",
      muted: "220 14.3% 95.9%",
      "muted-foreground": "220 8.9% 46.1%",
      accent: "220 14.3% 95.9%",
      "accent-foreground": "220.9 39.3% 11%",
      destructive: "0 84.2% 60.2%",
      "destructive-foreground": "210 20% 98%",
      border: "220 13% 91%",
      input: "220 13% 91%",
      ring: "224 71.4% 4.1%",
      "chart-1": "12 76% 61%",
      "chart-2": "173 58% 39%",
      "chart-3": "197 37% 24%",
      "chart-4": "43 74% 66%",
      "chart-5": "27 87% 67%",
    },
    dark: {
      background: "224 71.4% 4.1%",
      foreground: "210 20% 98%",
      card: "224 71.4% 4.1%",
      "card-foreground": "210 20% 98%",
      popover: "224 71.4% 4.1%",
      "popover-foreground": "210 20% 98%",
      primary: "210 20% 98%",
      "primary-foreground": "220.9 39.3% 11%",
      secondary: "215 27.9% 16.9%",
      "secondary-foreground": "210 20% 98%",
      muted: "215 27.9% 16.9%",
      "muted-foreground": "217.9 10.6% 64.9%",
      accent: "215 27.9% 16.9%",
      "accent-foreground": "210 20% 98%",
      destructive: "0 62.8% 30.6%",
      "destructive-foreground": "210 20% 98%",
      border: "215 27.9% 16.9%",
      input: "215 27.9% 16.9%",
      ring: "216 12.2% 83.9%",
      "chart-1": "220 70% 50%",
      "chart-2": "160 60% 45%",
      "chart-3": "30 80% 55%",
      "chart-4": "280 65% 60%",
      "chart-5": "340 75% 55%",
    },
  },
  cssVarsV4: {
    light: {
      background: "oklch(1 0 0)", // --color-white (closest to gray-50)
      foreground: "oklch(0.13 0.028 261.692)", // --color-gray-950
      card: "oklch(1 0 0)", // --color-white (closest to gray-50)
      "card-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      popover: "oklch(1 0 0)", // --color-white (closest to gray-50)
      "popover-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      primary: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      secondary: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "secondary-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      muted: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "muted-foreground": "oklch(0.551 0.027 264.364)", // --color-gray-500
      accent: "oklch(0.967 0.003 264.542)", // --color-gray-100
      "accent-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      destructive: "oklch(0.577 0.245 27.325)", // --color-red-600
      "destructive-foreground": "oklch(0.577 0.245 27.325)", // --color-red-600
      border: "oklch(0.928 0.006 264.531)", // --color-gray-200
      input: "oklch(0.928 0.006 264.531)", // --color-gray-200
      ring: "oklch(0.872 0.01 258.338)", // --color-gray-300
      "chart-1": "oklch(0.646 0.222 41.116)", // --color-orange-600
      "chart-2": "oklch(0.6 0.118 184.704)", // --color-teal-600
      "chart-3": "oklch(0.398 0.07 227.392)", // --color-cyan-900
      "chart-4": "oklch(0.828 0.189 84.429)", // --color-amber-400
      "chart-5": "oklch(0.769 0.188 70.08)", // --color-amber-500
      radius: "0.625rem", // Not a color
      sidebar: "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-foreground": "oklch(0.13 0.028 261.692)", // --color-gray-950
      "sidebar-primary": "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-accent": "oklch(0.967 0.003 264.542)", // --color-gray-100
      "sidebar-accent-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-border": "oklch(0.928 0.006 264.531)", // --color-gray-200
      "sidebar-ring": "oklch(0.872 0.01 258.338)", // --color-gray-300
    },
    dark: {
      background: "oklch(0.13 0.028 261.692)", // --color-gray-950
      foreground: "oklch(0.985 0.002 247.839)", // --color-gray-50
      card: "oklch(0.13 0.028 261.692)", // --color-gray-950
      "card-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      popover: "oklch(0.13 0.028 261.692)", // --color-gray-950
      "popover-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      primary: "oklch(0.985 0.002 247.839)", // --color-gray-50
      "primary-foreground": "oklch(0.21 0.034 264.665)", // --color-gray-900
      secondary: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "secondary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      muted: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "muted-foreground": "oklch(0.707 0.022 261.325)", // --color-gray-400
      accent: "oklch(0.278 0.033 256.848)", // --color-gray-800
      "accent-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      destructive: "oklch(0.396 0.141 25.723)", // --color-red-900
      "destructive-foreground": "oklch(0.637 0.237 25.331)", // --color-red-500
      border: "oklch(0.278 0.033 256.848)", // --color-gray-800
      input: "oklch(0.278 0.033 256.848)", // --color-gray-800
      ring: "oklch(0.446 0.03 256.802)", // --color-gray-600
      "chart-1": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "chart-2": "oklch(0.696 0.17 162.48)", // --color-emerald-500
      "chart-3": "oklch(0.769 0.188 70.08)", // --color-amber-500
      "chart-4": "oklch(0.627 0.265 303.9)", // --color-purple-500
      "chart-5": "oklch(0.645 0.246 16.439)", // --color-rose-500
      sidebar: "oklch(0.21 0.034 264.665)", // --color-gray-900
      "sidebar-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-primary": "oklch(0.488 0.243 264.376)", // --color-blue-700
      "sidebar-primary-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-accent": "oklch(0.278 0.033 256.848)", // --color-gray-800
      "sidebar-accent-foreground": "oklch(0.985 0.002 247.839)", // --color-gray-50
      "sidebar-border": "oklch(0.278 0.033 256.848)", // --color-gray-800
      "sidebar-ring": "oklch(0.446 0.03 256.802)", // --color-gray-600
    },
  },
  inlineColorsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n  ",
  cssVarsTemplate:
    "@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n@layer base {\n  :root {\n    --background: 0 0% 100%;\n    --foreground: 224 71.4% 4.1%;\n    --card: 0 0% 100%;\n    --card-foreground: 224 71.4% 4.1%;\n    --popover: 0 0% 100%;\n    --popover-foreground: 224 71.4% 4.1%;\n    --primary: 220.9 39.3% 11%;\n    --primary-foreground: 210 20% 98%;\n    --secondary: 220 14.3% 95.9%;\n    --secondary-foreground: 220.9 39.3% 11%;\n    --muted: 220 14.3% 95.9%;\n    --muted-foreground: 220 8.9% 46.1%;\n    --accent: 220 14.3% 95.9%;\n    --accent-foreground: 220.9 39.3% 11%;\n    --destructive: 0 84.2% 60.2%;\n    --destructive-foreground: 210 20% 98%;\n    --border: 220 13% 91%;\n    --input: 220 13% 91%;\n    --ring: 224 71.4% 4.1%;\n    --radius: 0.5rem;\n    --chart-1: 12 76% 61%;\n    --chart-2: 173 58% 39%;\n    --chart-3: 197 37% 24%;\n    --chart-4: 43 74% 66%;\n    --chart-5: 27 87% 67%;\n  }\n\n  .dark {\n    --background: 224 71.4% 4.1%;\n    --foreground: 210 20% 98%;\n    --card: 224 71.4% 4.1%;\n    --card-foreground: 210 20% 98%;\n    --popover: 224 71.4% 4.1%;\n    --popover-foreground: 210 20% 98%;\n    --primary: 210 20% 98%;\n    --primary-foreground: 220.9 39.3% 11%;\n    --secondary: 215 27.9% 16.9%;\n    --secondary-foreground: 210 20% 98%;\n    --muted: 215 27.9% 16.9%;\n    --muted-foreground: 217.9 10.6% 64.9%;\n    --accent: 215 27.9% 16.9%;\n    --accent-foreground: 210 20% 98%;\n    --destructive: 0 62.8% 30.6%;\n    --destructive-foreground: 210 20% 98%;\n    --border: 215 27.9% 16.9%;\n    --input: 215 27.9% 16.9%;\n    --ring: 216 12.2% 83.9%;\n    --chart-1: 220 70% 50%;\n    --chart-2: 160 60% 45%;\n    --chart-3: 30 80% 55%;\n    --chart-4: 280 65% 60%;\n    --chart-5: 340 75% 55%;\n  }\n}\n\n@layer base {\n  * {\n    @apply border-border;\n  }\n  body {\n    @apply bg-background text-foreground;\n  }\n}",
};

export default gray;
