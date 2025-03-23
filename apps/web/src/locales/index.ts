"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Lang } from "@iroy/i18n/config";
// import { getI18n } from "@iroy/i18n";

export function useI18n() {
  const [t, setT] = useState<(key: any) => string>(() => (key: any) => "");
  const { lang } = useParams() as { lang: Lang };

  useEffect(() => {
    function fetchTranslations() {
      fetch(`/api/i18n?locale=${lang}&folder=${"src/locales"}`)
        .then(res => res.json())
        .then(async data => {
          // let translateFn = await getI18n(lang, data);
          // setT(() => translateFn);
        });
    }
    fetchTranslations();
  }, [lang]);

  return t;
}
