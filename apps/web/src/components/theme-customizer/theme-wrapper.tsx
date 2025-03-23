"use client";
import { useThemeStore } from "@iroy/theme";
import { cn } from "@iroy/ui/lib/utils";
import React from "react";

interface Props extends React.ComponentProps<"div"> {
  defaultTheme?: string;
  className?: string;
  children: React.ReactNode;
}
const ThemeWrapper: React.FC<Props> = ({
  defaultTheme,
  className,
  children,
}) => {
  const { theme, radius } = useThemeStore();
  return (
    <div
      className={cn(`theme-${defaultTheme || theme}`, "w-full", className)}
      style={
        {
          "--radius": `${defaultTheme ? 0.5 : radius}rem`,
        } as React.CSSProperties
      }>
      {children}
    </div>
  );
};
export default ThemeWrapper;
