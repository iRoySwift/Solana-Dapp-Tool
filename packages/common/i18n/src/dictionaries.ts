import { merge } from "@iroy/utils/lodash-es";
import { Lang } from "./config";
import { ReturnFnJsonType } from "./typing";
import { PathsToString } from "@iroy/utils/typing";
import { loadLocale } from "./load-locales";

export const dictionaries = {
  en: () =>
    import("./locales/en/common.json").then(module => ({
      common: module.default,
    })),
  zh: () =>
    import("./locales/zh/common.json").then(module => ({
      common: module.default,
    })),
};

export type Dictionaries = ReturnFnJsonType<typeof dictionaries>;

export type DictionariesKey = PathsToString<Dictionaries>;

export async function getDictionary(lang: Lang, url = "src/locales") {
  let dictionary = await loadLocale(lang, url);
  const mergeLocales = merge({}, await dictionaries[lang](), dictionary ?? {});
  return mergeLocales;
}
