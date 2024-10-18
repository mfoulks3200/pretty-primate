import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useSetting } from "@/src/common/Settings";
import { useEffect } from "react";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = useSetting("colorMode", "system");
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={theme as "light" | "dark" | "system"}
    >
      {children}
    </ThemeProvider>
  );
};
