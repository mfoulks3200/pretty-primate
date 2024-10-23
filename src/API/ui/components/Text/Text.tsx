import { useNode } from "@craftjs/core";
import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";
import {
  SliderControl,
  TextareaControl,
} from "../../Inspector/InspectorControls";
import { BoxModel, defaultBoxModel } from "../../css/CSSProps";
import {
  boxModelToCssProps,
  computeStyles,
  stringToColorValue,
} from "../../css/CSSUtils";
import { CssUnit } from "@/src/API/ui/css/CSSProps";

export const Text = ({
  text,
  children,
  styles,
  ...props
}: {
  text: string;
  children?: React.ReactNode;
  styles?: Partial<BoxModel>;
  props?: typeof TextDefaultProps;
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

  const computedProps =
    props === undefined ? TextDefaultProps : { ...TextDefaultProps, ...props };

  const computedStyles = computeStyles([
    {
      style: defaultBoxModel,
    },
    {
      style: styles ?? {},
    },
    {
      style: {
        text: {
          size: {
            value: computedProps.fontSize,
            unit: computedProps.fontUnit as CssUnit,
          },
          color: stringToColorValue(computedProps.color),
        },
      },
    },
  ]);

  return (
    <div
      {...props}
      ref={(ref) => connect(drag(ref!))}
      onClick={() => selected && setEditable(true)}
      style={boxModelToCssProps(computedStyles)}
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
        onChange={(value) => {
          setProp((props: any) => (props.fontSize = value), 250);
        }}
      />
    </>
  );
};

export const TextDefaultProps = {
  text: "New Text",
  fontSize: 12,
  fontUnit: "px",
  color: "rgba(255,255,255,1)",
};

Text.craft = {
  props: TextDefaultProps,
  related: {
    settings: TextSettings,
  },
};
