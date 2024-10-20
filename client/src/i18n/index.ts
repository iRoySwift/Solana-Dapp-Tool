"use client";
import { useParams } from "next/navigation";
import { i18n } from "./config";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

const locals = {
    en,
    zh,
};

export type Locale = (typeof i18n)["locales"][number];

const useI18n = () => {
    const params = useParams<{ lang: Locale }>();
    const local: any = params.lang ? locals[params.lang] : en;

    const t = (key: string) => {
        return local[key] ? local[key] : key;
    };

    return t;
};

export { i18n, useI18n };
