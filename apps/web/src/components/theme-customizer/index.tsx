"use client";

import { Button } from "@iroy/ui/components/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@iroy/ui/components/drawer";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@iroy/ui/components/popover";
import React from "react";
import Customizer from "./customizer";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@iroy/ui/components/dialog";
import { Input } from "@iroy/ui/components/input";
import { Label } from "@iroy/ui/components/label";
import ThemeWrapper from "./theme-wrapper";
import { ThemeColor, themeColor } from "@iroy/theme/colors";
import { useThemeStore } from "@iroy/theme";
import { template } from "@iroy/utils/lodash-es";
import { Check, Copy } from "@iroy/ui/icons";
import { copyToClipboardWithMeta } from "./copy-button";
import { cn } from "@iroy/ui/lib/utils";

interface Props {}
const ThemeCustomizer: React.FC<Props> = () => {
  return (
    <div className="flex items-center gap-2">
      <Drawer>
        <DrawerTrigger asChild>
          <Button asChild size="sm" className="md:hidden">
            Customize
          </Button>
        </DrawerTrigger>
        <DrawerContent className="p-6 pt-0">
          <Customizer />
        </DrawerContent>
      </Drawer>
      <div className="hidden items-center md:flex">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">Customize</Button>
          </PopoverTrigger>
          <PopoverContent className="w-[340px]" align="start">
            <Customizer />
          </PopoverContent>
        </Popover>
      </div>
      <CopyCodeButton variant="ghost" size="sm" className="[&_svg]:hidden" />
    </div>
  );
};

function CopyCodeButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const [hasCopied, setHasCopied] = React.useState(false);
  const { theme, radius } = useThemeStore();
  const activeTheme = themeColor.find(color => color.name == theme);
  return (
    <>
      {activeTheme && (
        <Button
          onClick={() => {
            copyToClipboardWithMeta(getThemeCode(activeTheme, radius), {
              name: "copy_theme_code",
              properties: {
                theme: activeTheme.name,
                radius: radius,
              },
            });
            setHasCopied(true);
          }}
          className={cn("md:hidden", className)}
          {...props}>
          {hasCopied ? <Check /> : <Copy />}
          Copy code
        </Button>
      )}
      <Dialog>
        <DialogTrigger asChild>
          <Button className={cn("hidden md:flex", className)} {...props}>
            Copy code
          </Button>
        </DialogTrigger>
        <DialogContent className="outline-none sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Theme</DialogTitle>
            <DialogDescription>
              Copy and paste the following code into your CSS file.
            </DialogDescription>
          </DialogHeader>
          <ThemeWrapper defaultTheme="zinc" className="relative">
            <CustomizerCode />
            {activeTheme && (
              <Button
                size="sm"
                onClick={() => {
                  copyToClipboardWithMeta(getThemeCode(activeTheme, radius), {
                    name: "copy_theme_code",
                    properties: {
                      theme: activeTheme.name,
                      radius: radius,
                    },
                  });
                  setHasCopied(true);
                }}
                className="bg-muted text-muted-foreground hover:bg-muted hover:text-muted-foreground absolute right-4 top-4">
                {hasCopied ? <Check /> : <Copy />}
                Copy
              </Button>
            )}
          </ThemeWrapper>
        </DialogContent>
      </Dialog>
    </>
  );
}

function CustomizerCode() {
  const { theme, radius } = useThemeStore();
  const activeTheme = themeColor.find(color => color.name == theme);

  return (
    <ThemeWrapper defaultTheme="zinc" className="relative space-y-4">
      <div data-rehype-pretty-code-fragment="">
        <pre className="max-h-[450px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900">
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            <span className="line text-white">@layer base &#123;</span>
            <span className="line text-white">&nbsp;&nbsp;:root &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVarsV4.light["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVarsV4.light["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map(prefix => (
              <div className="flex flex-col" key={`${prefix}`}>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVarsV4.light[
                      prefix as keyof typeof activeTheme.cssVarsV4.light
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVarsV4.light[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVarsV4.light
                    ]
                  }
                  ;
                </span>
              </div>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVarsV4.light["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVarsV4.light["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVarsV4.light["ring"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--radius: {radius}rem;
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              prefix => (
                <>
                  <span className="line text-white" key={prefix}>
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {
                      activeTheme?.cssVarsV4.light[
                        prefix as keyof typeof activeTheme.cssVarsV4.light
                      ]
                    }
                    ;
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&nbsp;</span>
            <span className="line text-white">&nbsp;&nbsp;.dark &#123;</span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--background:{" "}
              {activeTheme?.cssVarsV4.dark["background"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--foreground:{" "}
              {activeTheme?.cssVarsV4.dark["foreground"]};
            </span>
            {[
              "card",
              "popover",
              "primary",
              "secondary",
              "muted",
              "accent",
              "destructive",
            ].map(prefix => (
              <>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                  {
                    activeTheme?.cssVarsV4.dark[
                      prefix as keyof typeof activeTheme.cssVarsV4.dark
                    ]
                  }
                  ;
                </span>
                <span className="line text-white">
                  &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}-foreground:{" "}
                  {
                    activeTheme?.cssVarsV4.dark[
                      `${prefix}-foreground` as keyof typeof activeTheme.cssVarsV4.dark
                    ]
                  }
                  ;
                </span>
              </>
            ))}
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--border:{" "}
              {activeTheme?.cssVarsV4.dark["border"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--input:{" "}
              {activeTheme?.cssVarsV4.dark["input"]};
            </span>
            <span className="line text-white">
              &nbsp;&nbsp;&nbsp;&nbsp;--ring:{" "}
              {activeTheme?.cssVarsV4.dark["ring"]};
            </span>
            {["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"].map(
              prefix => (
                <>
                  <span className="line text-white">
                    &nbsp;&nbsp;&nbsp;&nbsp;--{prefix}:{" "}
                    {
                      activeTheme?.cssVarsV4.dark[
                        prefix as keyof typeof activeTheme.cssVarsV4.dark
                      ]
                    }
                    ;
                  </span>
                </>
              )
            )}
            <span className="line text-white">&nbsp;&nbsp;&#125;</span>
            <span className="line text-white">&#125;</span>
          </code>
        </pre>
      </div>
    </ThemeWrapper>
  );
}

function getThemeCode(theme: ThemeColor, radius: number) {
  if (!theme) {
    return "";
  }

  return template(BASE_STYLES_WITH_VARIABLES)({
    colors: theme.cssVarsV4,
    radius,
  });
}

const BASE_STYLES_WITH_VARIABLES = `
@layer base {
  :root {
    --background: <%- colors.light["background"] %>;
    --foreground: <%- colors.light["foreground"] %>;
    --card: <%- colors.light["card"] %>;
    --card-foreground: <%- colors.light["card-foreground"] %>;
    --popover: <%- colors.light["popover"] %>;
    --popover-foreground: <%- colors.light["popover-foreground"] %>;
    --primary: <%- colors.light["primary"] %>;
    --primary-foreground: <%- colors.light["primary-foreground"] %>;
    --secondary: <%- colors.light["secondary"] %>;
    --secondary-foreground: <%- colors.light["secondary-foreground"] %>;
    --muted: <%- colors.light["muted"] %>;
    --muted-foreground: <%- colors.light["muted-foreground"] %>;
    --accent: <%- colors.light["accent"] %>;
    --accent-foreground: <%- colors.light["accent-foreground"] %>;
    --destructive: <%- colors.light["destructive"] %>;
    --destructive-foreground: <%- colors.light["destructive-foreground"] %>;
    --border: <%- colors.light["border"] %>;
    --input: <%- colors.light["input"] %>;
    --ring: <%- colors.light["ring"] %>;
    --radius: <%- radius %>rem;
    --chart-1: <%- colors.light["chart-1"] %>;
    --chart-2: <%- colors.light["chart-2"] %>;
    --chart-3: <%- colors.light["chart-3"] %>;
    --chart-4: <%- colors.light["chart-4"] %>;
    --chart-5: <%- colors.light["chart-5"] %>;
  }

  .dark {
    --background: <%- colors.dark["background"] %>;
    --foreground: <%- colors.dark["foreground"] %>;
    --card: <%- colors.dark["card"] %>;
    --card-foreground: <%- colors.dark["card-foreground"] %>;
    --popover: <%- colors.dark["popover"] %>;
    --popover-foreground: <%- colors.dark["popover-foreground"] %>;
    --primary: <%- colors.dark["primary"] %>;
    --primary-foreground: <%- colors.dark["primary-foreground"] %>;
    --secondary: <%- colors.dark["secondary"] %>;
    --secondary-foreground: <%- colors.dark["secondary-foreground"] %>;
    --muted: <%- colors.dark["muted"] %>;
    --muted-foreground: <%- colors.dark["muted-foreground"] %>;
    --accent: <%- colors.dark["accent"] %>;
    --accent-foreground: <%- colors.dark["accent-foreground"] %>;
    --destructive: <%- colors.dark["destructive"] %>;
    --destructive-foreground: <%- colors.dark["destructive-foreground"] %>;
    --border: <%- colors.dark["border"] %>;
    --input: <%- colors.dark["input"] %>;
    --ring: <%- colors.dark["ring"] %>;
    --chart-1: <%- colors.dark["chart-1"] %>;
    --chart-2: <%- colors.dark["chart-2"] %>;
    --chart-3: <%- colors.dark["chart-3"] %>;
    --chart-4: <%- colors.dark["chart-4"] %>;
    --chart-5: <%- colors.dark["chart-5"] %>;
  }
}
`;

export default ThemeCustomizer;
