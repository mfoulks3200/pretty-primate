import { Button } from "@/src/components/ui/button";
import { useNode } from "@craftjs/core";
import React from "react";

const ButtonComponent = ({
  text,
  variant = "secondary",
}: {
  text: string;
  variant?:
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "link"
    | null
    | undefined;
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <Button ref={(ref) => connect(drag(ref!))} variant={variant}>
      {text}
    </Button>
  );
};

export { ButtonComponent as Button };
