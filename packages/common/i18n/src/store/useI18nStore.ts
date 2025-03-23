import { create } from "zustand";
import { Lang } from "../config";
import { Dictionaries, DictionariesKey, getDictionary } from "../dictionaries";
import { getNestedValue } from "@iroy/utils/common";

interface I18nStore {
  dictionaries: Dictionaries | any;
  setDictionaries: (lang: Lang, url?: string) => void;
  $t: (key: DictionariesKey | any) => string;
}

export const useI18nStore = create<I18nStore>((set, get) => ({
  dictionaries: [],
  setDictionaries: async (lang: Lang, url = "src/locales") => {
    const dictionaries = await getDictionary(lang, url);
    set({ dictionaries });
  },
  $t: (key: DictionariesKey) => {
    return getNestedValue(get().dictionaries, key);
  },
}));
