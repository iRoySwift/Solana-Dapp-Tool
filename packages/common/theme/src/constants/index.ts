export const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#09090b",
};

export const styles = [
  {
    name: "new-york",
    label: "New York",
  },
  {
    name: "default",
    label: "Default",
  },
] as const;

export type Style = (typeof styles)[number];
