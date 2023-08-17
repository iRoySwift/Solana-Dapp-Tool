import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "@/locales/en.json";
import zhCN from "@/locales/zh.json";
import { AppCachedKeys } from "./const";
import { fetchCachedData, storeCachedData } from "./cache";
import { handleChangeLanguage } from "@/content/withLayoutContent";
console.log("🚀 ~ file: i18n.ts:6 ~ AppCachedKeys:", AppCachedKeys);

// the translations
// (tip move them in a JSON file and import them)
const resources = {
    enUS,
    zhCN,
};

export type iLan = "enUS" | "zhCN";

i18n.use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        fallbackLng: navigator.language.includes("zhCN") ? "zhCN" : "enUS", // use en if detected lng is not available
        debug: true,
        // keySeparator: false, // we do not use keys in form messages.welcome
        interpolation: {
            escapeValue: false, // react already safes from xss
        },
    });

/**
 * change language
 * @param lan
 */
const changeLanguage = (lan: iLan) => {
    if (lan.indexOf("zhCN") !== -1) {
        i18n.changeLanguage("zhCN");
    } else {
        i18n.changeLanguage("enUS");
    }
    storeCachedData(AppCachedKeys.AppLanguage, lan);
};

/**
 * get language
 * @returns language
 */
const currentLanguage = (): iLan | null => {
    return fetchCachedData<"enUS" | "zhCN">(AppCachedKeys.AppLanguage);
};

const initAppLanguage = (state, dispatch: any) => {
    const lang =
        fetchCachedData<iLan>(AppCachedKeys.AppLanguage) || state.language;
    setTimeout(() => {
        dispatch(handleChangeLanguage(lang));
    }, 0);
    changeLanguage(lang);
};

export { initAppLanguage, changeLanguage, currentLanguage };
export default i18n;
