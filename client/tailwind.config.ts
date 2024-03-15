import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: ["class", '[data-theme="dark"]'],
    theme: {
        extend: {
            gridTemplateColumns: {
                // Simple 16 column grid
                "200": "repeat(3, 200px)",

                // Complex site-specific column configuration
                footer: "200px minmax(900px, 1fr) 100px",
            },
            keyframes: {
                ripple: {
                    "0%": {
                        transform: "scale(0)",
                        opacity: "0.1",
                    },
                    "100%": {
                        transform: "scale(10)",
                        opacity: "0.3",
                    },
                },
                "ripple-pulsate": {
                    "0%": {
                        transform: "scale(1)",
                    },
                    "50%": {
                        transform: "scale(0.92)",
                    },
                    "100%": {
                        transform: "scale(1)",
                    },
                },
            },
            animation: {
                ripple: "ripple 550ms ease-in-out forwards",
                "ripple-pulsate":
                    "ripple-pulsate 2500ms ease-in-out 200ms infinite",
            },
            backgroundSize: {
                "100%": "100%",
                "15000%": "15000%",
            },
            backgroundImage: {
                "gradient-radial":
                    "radial-gradient(circle,  #d4d4d4 1%,transparent 1%)",
                // "radial-gradient(transparent 1%, var(--tw-gradient-stops) 1%)",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                light: {
                    active: {
                        DEFAULT: "hsl(0, 0%, 8%)",
                        dark: "hsl(33, 100%, 52%)",
                    },
                    button: {
                        DEFAULT: "hsl(0, 0%, 84%)",
                        hover: "hsl(0, 0%, 74%)",
                    },
                    input: {
                        bkg: "hsl(0, 0%, 97%)",
                        border: "hsl(0, 0%, 33%)",
                        borderDark: "hsl(0, 0%, 23%)",
                    },
                    link: {
                        DEFAULT: "hsl(33, 100%, 57%)",
                        hover: "hsl(33, 100%, 52%)",
                    },
                    down: {
                        DEFAULT: "hsl(0, 39%, 58%)",
                        dark: "hsl(0, 39%, 53%)",
                        muted: "hsl(0, 19%, 53%)",
                    },
                    up: {
                        DEFAULT: "hsl(111, 47%, 53%)",
                        dark: "hsl(111, 47%, 48%)",
                        muted: "hsl(111, 7%, 48%)",
                    },

                    bkg: colors.neutral[50],
                    "bkg-hover": "hsl(0, 0%, 94%)",
                    "bkg-active": "hsl(0, 0%, 89%)",
                    border: "hsl(0, 0%, 84%)",
                    "fgd-1": "hsl(0, 0%, 8%)",
                    "fgd-2": "hsl(0, 0%, 23%)",
                    "fgd-3": "hsl(0, 0%, 38%)",
                    "fgd-4": "hsl(0, 0%, 53%)",
                },
                dark: {
                    active: {
                        DEFAULT: "hsl(45, 86%, 62%)",
                        dark: "hsl(45, 86%, 57%)",
                    },
                    button: {
                        DEFAULT: "hsl(269, 38%, 48%)",
                        hover: "hsl(269, 38%, 43%)",
                    },
                    input: {
                        bkg: "hsl(256, 18%, 10%)",
                        border: "hsl(253, 19%, 41%)",
                        borderDark: "hsl(253, 19%, 31%)",
                    },
                    link: {
                        DEFAULT: "hsl(33, 100%, 57%)",
                        hover: "hsl(33, 100%, 52%)",
                    },
                    down: {
                        DEFAULT: "hsl(4, 63%, 55%)",
                        dark: "hsl(4, 93%, 55%)",
                        muted: "hsl(4, 43%, 38%)",
                    },
                    up: {
                        DEFAULT: "hsl(77, 63%, 40%)",
                        dark: "hsl(85, 50%, 36%)",
                        muted: "hsl(84, 40%, 32%)",
                    },

                    bkg: "hsl(256, 18%, 12%)",
                    "bkg-hover": "hsl(256, 18%, 17%)",
                    "bkg-active": "hsl(256, 18%, 22%)",
                    border: "hsl(256, 18%, 27%)",
                    "fgd-1": "hsl(253, 19%, 91%)",
                    "fgd-2": "hsl(253, 19%, 81%)",
                    "fgd-3": "hsl(253, 19%, 71%)",
                    "fgd-4": "hsl(253, 19%, 61%)",
                },
                "tw-priamry": "var(--primary)",
                "tw-info": "var(--info)",
                "tw-error": "var(--error)",
                "tw-success": "var(--success)",
                "tw-warning": "var(--warning)",
                "tw-bkg": "var(--bkg)",
                "tw-bkg-hover": "var(--bkg-hover)",
                "tw-bkg-hover-2": "var(--bkg-hover-2)",
                // "th-bkg-active": "var(--bkg-active)",
                "tw-border": "var(--border)",
                "tw-fgd-1": "var(--fgd-1)",
                "tw-fgd-2": "var(--fgd-2)",
                "tw-fgd-3": "var(--fgd-3)",
                "tw-link-active": "var(--link-active)",
                // "th-fgd-4": "var(--fgd-4)",
                // "th-active": "var(--active)",
                // "th-active-dark": "var(--active-dark)",
                // "th-down": "var(--down)",
                // "th-down-dark": "var(--down-dark)",
                // "th-down-muted": "var(--down-muted)",
                // "th-up": "var(--up)",
                // "th-up-dark": "var(--up-dark)",
                // "th-up-muted": "var(--up-muted)",
                // "th-link": "var(--link)",
                // "th-link-hover": "var(--link-hover)",
                // "th-button": "var(--button)",
                // "th-button-hover": "var(--button-hover)",
                // "th-input-bkg": "var(--input-bkg)",
                // "th-input-border": "var(--input-border)",
                // "th-input-border-hover": "var(--input-border-hover)",
            },
        },
    },
    plugins: [],
};
export default config;
