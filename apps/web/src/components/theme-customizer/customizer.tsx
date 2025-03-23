"use client";
import React from "react";
import ThemeWrapper from "./theme-wrapper";
import { Button } from "@iroy/ui/components/button";
import { Check, Moon, Repeat, Sun } from "@iroy/ui/icons";
import { Label } from "@iroy/ui/components/label";
import { themeColor } from "@iroy/theme/colors";
import { useTheme, useThemeStore } from "@iroy/theme";
import { cn } from "@iroy/ui/lib/utils";
import { Skeleton } from "@iroy/ui/components/skeleton";

interface Props {}
const Customizer: React.FC<Props> = () => {
  const [mounted, setMounted] = React.useState(false);
  const { setTheme: setMode, resolvedTheme: mode = "light" } = useTheme();
  const { radius, setRadius, theme, setTheme, style, setThemeConfig } =
    useThemeStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <ThemeWrapper className="flex flex-col" defaultTheme="zinc">
      <div className="flex items-start pt-4 md:pt-0">
        <div className="gap-1 pr-2">
          <div className="font-semibold leading-none tracking-tight">
            Theme Customizer
          </div>
          <div className="text-muted-foreground text-xs">
            Customize your components colors.
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => {
            setThemeConfig("new-york", "zinc", 0.5);
          }}>
          <Repeat />
          <span className="sr-only">Reset</span>
        </Button>
      </div>
      <div className="flex flex-1 flex-col gap-4 md:gap-6">
        <div className="gap-1.5">
          <Label className="text-xs">Color</Label>
          <div className="grid grid-cols-3 gap-2">
            {themeColor
              .filter(
                theme =>
                  !["slate", "stone", "gray", "neutral"].includes(theme.name)
              )
              .map(color => {
                const isActive = theme === color.name;
                return (
                  <Button
                    className="justify-start"
                    variant={"outline"}
                    size="sm"
                    style={
                      {
                        "--theme-primary":
                          mode == "dark"
                            ? color.cssVarsV4.dark.primary
                            : color.cssVarsV4.light.primary,
                      } as React.CSSProperties
                    }
                    key={color.name}
                    onClick={() => setTheme(color.name)}>
                    <span
                      className={cn(
                        "-tranlate-x-1 bg-(--theme-primary) mr-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                      )}>
                      {isActive && <Check className="h-4 w-4 text-white" />}
                    </span>
                    {color.name}
                  </Button>
                );
              })}
          </div>
        </div>
        <div className="gap-1.5">
          <Label className="text-xs">Radius</Label>
          <div className="grid grid-cols-3 gap-2">
            {["0", "0.3", "0.5", "0.75", "1.0"].map(value => {
              return (
                <Button
                  variant={"outline"}
                  size="sm"
                  key={value}
                  onClick={() => {
                    setRadius(parseFloat(value));
                  }}
                  className={cn(
                    radius === parseFloat(value) && "border-primary border-2"
                  )}>
                  {value}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="gap-1.5">
          <Label className="text-xs">Mode</Label>
          <div className="grid grid-cols-3 gap-2">
            {mounted ? (
              <>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("light")}
                  className={cn(mode === "light" && "border-primary border-2")}>
                  <Sun className="mr-1 -translate-x-1" />
                  Light
                </Button>
                <Button
                  variant={"outline"}
                  size="sm"
                  onClick={() => setMode("dark")}
                  className={cn(mode === "dark" && "border-primary border-2")}>
                  <Moon className="mr-1 -translate-x-1" />
                  Dark
                </Button>
              </>
            ) : (
              <>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
              </>
            )}
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
};
export default Customizer;
