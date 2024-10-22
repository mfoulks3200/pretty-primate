import { Accordion } from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import { useEditor } from "@craftjs/core";
import { createElement } from "react";

export const ComponentInspector = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
    };
  });

  if (selected) {
    return (
      <div className={"flex flex-col gap-6 p-2"}>
        <div className={"text-base"}>{selected.name}</div>
        <div className={"flex flex-col gap-8"}>
          {selected.settings && (
            <Accordion type="single" collapsible>
              {createElement(selected.settings)}
            </Accordion>
          )}
          {selected.isDeletable ? (
            <Button variant={"destructive"}>Delete Component</Button>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className={"h-full w-full flex items-center justify-center"}>
        Nothing Selected
      </div>
    );
  }
};
