"use server";

import { getNestedValue } from "@iroy/utils/common";
import { Lang } from "./config";
import { DictionariesKey, getDictionary } from "./dictionaries";

export async function getI18n<T = DictionariesKey | string>(
  lang: Lang,
  url = "src/locales"
) {
  const dictionaries = await getDictionary(lang, url);
  /**
   * Translation function to get the translated value for a given key.
   *
   * @param key The key to translate.
   * @returns The translated value.
   */
  type Key = DictionariesKey | T;
  const $t = (key: Key) => {
    return getNestedValue<Key>(dictionaries, key);
  };

  return $t;
}
