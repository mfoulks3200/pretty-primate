import { Slider } from "@/src/components/ui/slider";
import { useNode } from "@craftjs/core";
import React from "react";
import { SliderControl } from "../../Inspector/InspectorControls";

export const Stack = ({
  padding = 12,
  gap = 12,
  maxWidth = 1000,
  children,
}: {
  padding?: number;
  gap?: number;
  maxWidth?: number;
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      className={"border border-dashed border-border w-full flex flex-col"}
      style={{
        padding: `${padding}px`,
        maxWidth: `${maxWidth}px`,
        gap: `${gap}px`,
      }}
      ref={(ref) => connect(drag(ref!))}
    >
      {children}
    </div>
  );
};

export const StackSettings = () => {
  const {
    padding,
    gap,
    maxWidth,
    actions: { setProp },
  } = useNode((node) => ({
    padding: node.data.props.padding,
    gap: node.data.props.gap,
    maxWidth: node.data.props.maxWidth,
  }));

  return (
    <>
      <SliderControl
        title={"Padding"}
        value={padding}
        min={1}
        max={50}
        step={1}
        onChange={(value) =>
          setProp((props: any) => (props.padding = value), 250)
        }
        suffix={"px"}
      />
      <SliderControl
        title={"Gap"}
        value={gap}
        min={1}
        max={50}
        step={1}
        onChange={(value) => setProp((props: any) => (props.gap = value), 250)}
        suffix={"px"}
      />
      <SliderControl
        title={"Max Width"}
        value={maxWidth}
        min={250}
        max={1000}
        step={1}
        onChange={(value) =>
          setProp((props: any) => (props.maxWidth = value), 250)
        }
        suffix={"px"}
      />
    </>
  );
};

export const StackDefaultProps = {
  padding: 12,
  gap: 12,
  maxWidth: 1000,
};

Stack.craft = {
  props: StackDefaultProps,
  related: {
    settings: StackSettings,
  },
};
