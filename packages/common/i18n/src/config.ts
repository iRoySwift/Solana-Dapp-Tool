// Configuration for i18n
export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh"],
} as const;

export type Lang = (typeof i18n)["locales"][number];
