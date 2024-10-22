import { Slider } from "@/src/components/ui/slider";
import { Textarea } from "@/src/components/ui/textarea";
import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import { SliderControl, TextareaControl } from "../InspectorControls";

export const Text = ({
  text,
  fontSize = 10,
  textAlign = "left",
  ...props
}: {
  text: string;
  fontSize?: number;
  textAlign?: "left" | "center" | "right";
}) => {
  const {
    connectors: { connect, drag },
    selected,
    actions: { setProp },
  } = useNode((state) => ({
    selected: state.events.selected,
    dragged: state.events.dragged,
  }));

  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (selected) {
      return;
    }

    setEditable(false);
  }, [selected]);

  return (
    <div
      {...props}
      ref={(ref) => connect(drag(ref!))}
      onClick={() => selected && setEditable(true)}
    >
      <ContentEditable
        html={text}
        disabled={!editable}
        onChange={(e) =>
          setProp(
            (props: any) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")),
            500
          )
        }
        tagName="p"
        style={{ fontSize: `${fontSize}px`, textAlign }}
      />
    </div>
  );
};

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
    text,
  } = useNode((node) => ({
    text: node.data.props.text,
    fontSize: node.data.props.fontSize,
  }));

  return (
    <>
      <TextareaControl
        title={"Text"}
        value={text}
        onChange={(value) => {
          setProp((props: any) => (props.text = value), 250);
        }}
      />
      <SliderControl
        title={"Font size"}
        value={fontSize}
        min={1}
        max={100}
        step={1}
        suffix="px"
        onChange={(value) => {
          setProp((props: any) => (props.fontSize = value), 250);
        }}
      />
    </>
  );
};

export const TextDefaultProps = {
  text: "Hi",
  fontSize: 10,
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
