import { create } from "zustand";
import { ThemeColor } from "@iroy/theme/colors";
import { Style } from "@iroy/theme/constants";

type iThemeSore = {
  style: Style["name"];
  theme: ThemeColor["name"];
  radius: number;
  setTheme: (theme: ThemeColor["name"]) => void;
  setStyle: (style: Style["name"]) => void;
  setRadius: (radius: number) => void;
  setThemeConfig: (
    style: Style["name"],
    theme: ThemeColor["name"],
    radius: number
  ) => void;
};

export const useThemeStore = create<iThemeSore>(set => ({
  style: "new-york",
  theme: "zinc",
  radius: 0.5,
  setTheme: (theme: ThemeColor["name"]) => set({ theme }),
  setStyle: (style: Style["name"]) => set({ style }),
  setRadius: (radius: number) => set({ radius }),
  setThemeConfig: (
    style: Style["name"],
    theme: ThemeColor["name"],
    radius: number
  ) => set({ theme, style, radius }),
}));
