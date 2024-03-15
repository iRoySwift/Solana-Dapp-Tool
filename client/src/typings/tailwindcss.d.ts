declare module "tailwindcss/resolveConfig" {
    import type { Config } from "tailwindcss";
    import { DefaultColors } from "tailwindcss/types/generated/colors";
    import { DefaultTheme } from "tailwindcss/types/generated/default-theme";
    // import defaultTheme from "tailwindcss/defaultTheme";
    import colors from "tailwindcss/colors";

    type iColor = DefaultColors;

    type iTheme = DefaultTheme & {
        colors: iColor;
    };

    type iConfig = Config & {
        theme: iTheme;
    };
    declare function resolveConfig(config: iConfig): iConfig;
    export = resolveConfig;
}
