import {
  SidebarController,
  SidebarPage,
} from "@/src/components/SidebarController";
import { Code, Recycle, Settings, Sparkle } from "lucide-react";
import { SettingsPage } from "./SettingsPage";
import { useSetting } from "@/src/common/Settings";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { AboutPage } from "./AboutPage";
import { ScriptBrowser } from "./ScriptBrowser";

export const LocalPages = ({ pageId }: { pageId: string }) => {
  const theme = useSetting("colorMode", "system");
  console.log("Current Theme", theme);
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme(theme as "light" | "dark" | "system");
  }, [theme]);

  const pages: SidebarPage[] = [
    {
      id: "browser",
      title: "Script Browser",
      type: "page",
      href: "/scripts/browser",
      icon: Code,
      children: <ScriptBrowser />,
    },
    {
      id: "recycle",
      title: "Recycle Bin",
      type: "page",
      href: "/scripts/recycle",
      icon: Recycle,
      children: <div>Recycle Bin</div>,
      disabled: true,
    },
    {
      id: "settings",
      title: "Settings",
      type: "page",
      href: "/settings",
      icon: Settings,
      children: <SettingsPage />,
    },
    {
      id: "about",
      title: "About",
      type: "page",
      href: "/about",
      icon: Sparkle,
      children: <AboutPage />,
    },
  ];

  return <SidebarController pages={pages} defaultPageId={pageId} />;
};
