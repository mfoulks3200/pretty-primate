import { Accordion } from "@/src/components/ui/accordion";
import { Badge } from "@/src/components/ui/badge";
import { Button } from "@/src/components/ui/button";
import { useEditor } from "@craftjs/core";
import { ServerCrash } from "lucide-react";
import { createElement, useEffect } from "react";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";

export const ComponentInspector = () => {
  const { actions, selected, isEnabled } = useEditor((state, query) => {
    const currentNodeId = query.getEvent("selected").last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        displayName: state.nodes[currentNodeId].data.displayName,
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
      <div className={"flex flex-col h-full overflow-y-scroll"}>
        <div
          className={
            "sticky top-0 text-base p-4 bg-background z-40 flex justify-between border-b border-b-border"
          }
        >
          <div>{selected.displayName}</div>
          <Badge>{selected.name}</Badge>
        </div>
        <div className={"flex flex-col gap-8"}>
          <ErrorBoundary FallbackComponent={ErrorState}>
            {selected.settings && (
              <Accordion type="single" collapsible>
                {createElement(selected.settings)}
              </Accordion>
            )}
          </ErrorBoundary>

          {selected.isDeletable ? (
            <div className={"p-4 pt-0 w-full"}>
              <Button
                variant={"destructive"}
                onClick={() => actions.delete(selected.id)}
                className={"w-full"}
              >
                Delete Component
              </Button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  } else {
    return <EmptyState content={"Nothing Selected"} />;
  }
};

const ErrorState = ({ error }: { error: Error }) => {
  return (
    <EmptyState
      content={
        <div className={"flex flex-col gap-4 items-center justify-center"}>
          <ServerCrash size={64} absoluteStrokeWidth />
          <div className={"flex flex-col gap-2 items-center justify-center"}>
            <div>Something Went Wrong</div>
            <pre style={{ color: "red" }}>{error.message}</pre>
          </div>
        </div>
      }
    />
  );
};

const EmptyState = ({ content }: { content: string | React.ReactNode }) => {
  return (
    <div className={"min-h-72 h-full w-full flex items-center justify-center"}>
      {content}
    </div>
  );
};
