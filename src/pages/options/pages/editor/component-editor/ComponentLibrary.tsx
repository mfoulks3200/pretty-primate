import { Components } from "@/src/API/ui";
import { Button } from "@/src/components/ui/button";
import { useEditor, Element } from "@craftjs/core";

export const ComponentLibrary = () => {
  const editor = useEditor();
  return (
    <div className={"flex flex-col gap-6 p-4"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"text-base font-medium select-none"}>
          Layout Components
        </div>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Element canvas is={Components.Box} />
            )
          }
        >
          Box
        </Button>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Element canvas is={Components.Stack} />
            )
          }
        >
          Stack
        </Button>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Element canvas is={Components.Inline} />
            )
          }
        >
          Inline
        </Button>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Element canvas is={Components.Card} />
            )
          }
        >
          Card
        </Button>
      </div>
      <div className={"flex flex-col gap-2"}>
        <div className={"text-base font-medium select-none"}>Form Controls</div>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Components.Text text={"New Text"} />
            )
          }
        >
          Text
        </Button>
        <Button
          variant={"outline"}
          ref={(ref) =>
            editor.connectors.create(
              ref!,
              <Components.Button text={"New Text"} />
            )
          }
        >
          Button
        </Button>
      </div>
    </div>
  );
};
