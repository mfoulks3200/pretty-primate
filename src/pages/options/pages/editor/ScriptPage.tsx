import {
  SidebarAction,
  SidebarController,
  SidebarItem,
  SidebarPage,
} from "@/src/components/SidebarController";
import {
  ArrowLeft,
  Braces,
  ChartLine,
  Code,
  Dot,
  Hammer,
  LayoutPanelTop,
  Save,
  ServerCrash,
  Settings,
  Workflow,
} from "lucide-react";
import { DocumentEditor } from "./document-editor/DocumentEditor";
import { useLoaderData, useParams } from "react-router-dom";
import { ScriptSettings } from "./settings/ScriptSettings";
import { Userscript, UserscriptManager } from "@/src/common/Userscript";
import { useEffect, useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { ComponentEditor } from "./component-editor/ComponentEditor";

const fileTypeIcons = {
  javascript: Workflow,
  typescript: Workflow,
  css: LayoutPanelTop,
  html: LayoutPanelTop,
  json: Braces,
  component: Hammer,
};

export const ScriptPage = ({ pageId }: { pageId: string }) => {
  const [dirtyFiles, setDirtyFiles] = useState<Map<string, string>>(new Map());
  const [isSaving, setIsSaving] = useState(false);
  const userscript: Userscript = useLoaderData() as Userscript;
  const { uuid, fileUuid } = useParams();

  if (pageId === "file-editor") {
    if (fileUuid) {
      pageId = fileUuid!;
    } else {
      pageId = userscript.files[0].uuid;
    }
  }

  const saveAllFiles = () => {
    for (const [fileUuid, fileContent] of dirtyFiles) {
      UserscriptManager.updateFile(userscript, fileUuid, {
        ...userscript.files.find((file) => file.uuid === fileUuid)!,
        content: fileContent,
      });
    }
    setDirtyFiles(new Map());
  };

  useHotkeys(
    ["ctrl+s", "meta+s"],
    () => {
      saveAllFiles();
    },
    {
      preventDefault: true,
      enableOnContentEditable: true,
      enableOnFormTags: true,
    },
    [dirtyFiles]
  );

  const files: SidebarItem[] = userscript.files.map((file) => ({
    id: file.uuid,
    title: file.name,
    type: "page",
    href: `/editor/${uuid}/file/${file.uuid}`,
    icon: fileTypeIcons[file.type],
    ...(dirtyFiles.has(file.uuid)
      ? { afterIcon: <Dot className={"scale-[300%] text-yellow-500"} /> }
      : {}),
    children:
      file.type !== "component" ? (
        <DocumentEditor
          key={file.uuid}
          userscript={userscript}
          fileUuid={file.uuid}
          dirtyContent={dirtyFiles.get(file.uuid)}
          onChange={(content) => {
            if (content === file.content) {
              setDirtyFiles((prev) => {
                prev.delete(file.uuid);
                return new Map(prev);
              });
            } else {
              setDirtyFiles((prev) => new Map(prev.set(file.uuid, content)));
            }
          }}
        />
      ) : (
        <ComponentEditor
          content={dirtyFiles.get(file.uuid) ?? file.content}
          onChange={(content) => {
            if (content === file.content) {
              setDirtyFiles((prev) => {
                prev.delete(file.uuid);
                return new Map(prev);
              });
            } else {
              setDirtyFiles((prev) => new Map(prev.set(file.uuid, content)));
            }
          }}
        />
      ),
  }));

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
      onClick: () => saveAllFiles(),
    },
    {
      id: "settings",
      title: "Script Settings",
      type: "page",
      href: `/editor/${uuid}/settings`,
      icon: Settings,
      children: <ScriptSettings userscript={userscript} />,
    },
    {
      id: "errors",
      title: "Errors",
      type: "page",
      href: "/scripts/browser",
      icon: ServerCrash,
      children: <>Errors</>,
      disabled: true,
    },
    {
      id: "analytics",
      title: "Analytics",
      type: "page",
      href: "/scripts/browser",
      icon: ChartLine,
      children: <>Analytics</>,
      disabled: true,
    },
    {
      title: "Files",
      type: "header",
    },
    ...files,
  ];

  return <SidebarController pages={pages} defaultPageId={pageId} />;
};
