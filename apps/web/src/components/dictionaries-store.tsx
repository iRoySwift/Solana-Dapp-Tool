"use client";

import { useEffect } from "react";
import { useI18nStore } from "@iroy/i18n/store";
import { Lang } from "@iroy/i18n/config";

interface SetDictionariesProps {
  lang: Lang;
}

const DictionariesStore: React.FC<SetDictionariesProps> = ({ lang }) => {
  const { setDictionaries } = useI18nStore();

  useEffect(() => {
    setDictionaries(lang);
  }, [lang]);

  return null;
};

export default DictionariesStore;
