import { Button } from "@/src/components/ui/button";
import { IconButton } from "@/src/pages/common/IconButton";
import { useEditor, Element } from "@craftjs/core";
import { Blocks, Layers3, SquareMousePointer } from "lucide-react";
import { useState } from "react";
import { Components } from "@/src/API/ui";
import { ComponentInspector } from "./ComponentInspector";
import { Layers } from "@craftjs/layers";
import { Layer } from "./Layer";
import { ComponentLibrary } from "./ComponentLibrary";

interface ToolboxPage {
  title: string;
  icon: any;
  content: React.ReactNode;
}

export const Toolbox = () => {
  const tabs: { [k: string]: ToolboxPage } = {
    components: {
      title: "Components",
      icon: Blocks,
      content: <ComponentLibrary />,
    },
    inspector: {
      title: "Inspector",
      icon: SquareMousePointer,
      content: <ComponentInspector />,
    },
    layers: {
      title: "Layers",
      icon: Layers3,
      content: <Layers expandRootOnLoad={true} renderLayer={Layer} />,
    },
  };

  const [currentTab, setCurrentTab] = useState(Object.entries(tabs)[0][0]);

  return (
    <div className={"flex h-full"}>
      <div className={"flex flex-col gap-4 basis-full"}>
        {tabs[currentTab].content}
      </div>
      <div
        className={
          "p-1 w-fit max-w-fit border-l border-l-border flex flex-col gap-1"
        }
      >
        {Object.entries(tabs).map(([tabName, tab]) => (
          <IconButton
            key={tabName}
            icon={tab.icon}
            variant={currentTab === tabName ? "secondary" : "ghost"}
            tooltip={tab.title}
            tooltipDirection="left"
            onClick={() => setCurrentTab(tabName)}
          />
        ))}
      </div>
    </div>
  );
};
