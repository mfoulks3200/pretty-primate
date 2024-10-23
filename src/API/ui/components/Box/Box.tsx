import { Slider } from "@/src/components/ui/slider";
import { useNode } from "@craftjs/core";
import React from "react";
import { SliderControl } from "../../Inspector/InspectorControls";
import {
  BoxModel,
  defaultBoxModel,
  editModeBorder,
  RecursivePartial,
} from "../../css/CSSProps";
import { boxModelToCssProps, computeStyles } from "../../css/CSSUtils";
import { BoxModelControls } from "../../Inspector/BoxModelControls";

export const Box = ({
  children,
  styles,
  internal = false,
}: {
  children?: React.ReactNode;
  styles?: Partial<BoxModel>;
  internal?: boolean;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const isEditMode = !internal;

  const computedStyles = computeStyles([
    {
      style: defaultBoxModel,
    },
    {
      style: styles ?? {},
    },
    {
      style: editModeBorder,
      disabled: !isEditMode,
    },
  ]);

  return (
    <div
      className={"h-8"}
      style={boxModelToCssProps(computedStyles)}
      ref={(ref) => connect(drag(ref!))}
    >
      {children}
    </div>
  );
};

export const BoxSettings = () => {
  const {
    styles,
    actions: { setProp },
  } = useNode((node) => ({
    styles: node.data.props.styles,
  }));

  return (
    <>
      <BoxModelControls
        styles={styles}
        setStyles={(newStyles: BoxModel) => {
          setProp(
            (props: any) =>
              (props.styles = computeStyles([
                { style: props.styles },
                { style: newStyles },
              ])),
            250
          );
        }}
      />
    </>
  );
};

export const BoxDefaultProps = {
  styles: defaultBoxModel,
};

Box.craft = {
  props: BoxDefaultProps,
  related: {
    settings: BoxSettings,
  },
};
