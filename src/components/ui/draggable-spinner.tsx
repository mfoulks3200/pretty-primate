import * as React from "react";

import { cn } from "@/lib/utils";
import InputDrag from "react-input-with-drag";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange?: (value: number) => void;
}

const DraggableSpinner = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, value, onValueChange, ...props }) => {
    return (
      <InputDrag
        type={"number"}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        value={value}
        onChange={onValueChange}
      />
    );
  }
);
DraggableSpinner.displayName = "Input";

export { DraggableSpinner };
