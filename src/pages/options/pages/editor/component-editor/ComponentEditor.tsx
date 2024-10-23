import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/src/components/ui/resizable";
import { Toolbox } from "./ComponentToolbox";
import { Editor, Frame } from "@craftjs/core";
import { Components } from "@/src/API/ui";
import { Element } from "@craftjs/core";
import { ComponentToolbar } from "./ComponentToolbar";
import { RenderNode } from "@/src/API/ui/editor/RenderNode";
import { ColorControlContent } from "@/src/API/ui/Inspector/ColorControl";

export const ComponentEditor = ({
  onChange,
  content,
}: {
  onChange: (content: string) => void;
  content: string;
}) => {
  return (
    <div className={"w-full h-full basis-full flex craftjs-renderer"}>
      <Editor
        resolver={Components}
        onNodesChange={(query) => onChange(query.serialize())}
        onRender={RenderNode}
      >
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>
            <div className={"flex flex-col"}>
              <ComponentToolbar />
              <div className="p-8 w-full h-full flex items-center justify-center">
                <Frame data={content}>
                  <Element is={Components.Stack} canvas />
                </Frame>
              </div>
            </div>
            <ColorControlContent />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={30}>
            <Toolbox />
          </ResizablePanel>
        </ResizablePanelGroup>
      </Editor>
    </div>
  );
};
