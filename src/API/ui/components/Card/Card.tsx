import { useNode, Element } from "@craftjs/core";
import React from "react";
import { BoxModelControl } from "../../Inspector/InspectorControls";

export const Card = ({
  padding = {
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
  },
  children,
}: {
  padding?: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  children?: React.ReactNode;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  return (
    <div
      className={"border border-border rounded-md"}
      style={{
        paddingTop: `${padding.top}px`,
        paddingLeft: `${padding.left}px`,
        paddingRight: `${padding.right}px`,
        paddingBottom: `${padding.bottom}px`,
      }}
      ref={(ref) => connect(drag(ref!))}
    >
      {children}
    </div>
  );
};

export const CardSettings = () => {
  const {
    padding,
    actions: { setProp },
  } = useNode((node) => ({
    padding: node.data.props.padding,
  }));

  return <></>;
};

export const CardDefaultProps = {
  padding: {
    top: 12,
    left: 12,
    right: 12,
    bottom: 12,
  },
};

Card.craft = {
  props: CardDefaultProps,
  rules: {
    canDrag: () => true,
  },
  related: {
    settings: CardSettings,
  },
};
