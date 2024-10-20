import "server-only";

export const dictionaries = {
    en: () => import("@/i18n/locales/en.json").then(module => module.default),
    zh: () => import("@/i18n/locales/zh.json").then(module => module.default),
};

export const getDictionary = async (locale: "en" | "zh") =>
    dictionaries[locale]();
