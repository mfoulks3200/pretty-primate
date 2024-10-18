import {
  SidebarAction,
  SidebarController,
  SidebarItem,
  SidebarPage,
} from "@/components/SidebarController";
import {
  ArrowLeft,
  ChartLine,
  Code,
  Save,
  ServerCrash,
  Settings,
} from "lucide-react";
import { DocumentEditor } from "./DocumentEditor";

export const ScriptPage = ({ pageId }: { pageId: string }) => {
  const pages: SidebarItem[] = [
    {
      id: "back",
      title: "Back to Browser",
      type: "page",
      href: "/scripts",
      icon: ArrowLeft,
      children: <></>,
    },
    {
      id: "save",
      title: "Save File",
      type: "action",
      icon: Save,
      onClick: () => {},
    },
    {
      id: "settings",
      title: "Script Settings",
      type: "page",
      href: "/scripts/browser",
      icon: Settings,
      children: <>Settings</>,
    },
    {
      id: "errors",
      title: "Errors",
      type: "page",
      href: "/scripts/browser",
      icon: ServerCrash,
      children: <>Errors</>,
    },
    {
      id: "analytics",
      title: "Analytics",
      type: "page",
      href: "/scripts/browser",
      icon: ChartLine,
      children: <>Analytics</>,
    },
    {
      title: "Files",
      type: "header",
    },
    {
      id: "main-script",
      title: "Main Script",
      type: "page",
      href: "/scripts/browser",
      icon: Code,
      children: <DocumentEditor />,
    },
  ];

  return <SidebarController pages={pages} defaultPageId={pageId} />;
};
