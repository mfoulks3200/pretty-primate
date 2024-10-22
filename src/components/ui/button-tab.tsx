import React, { ForwardRefExoticComponent, RefAttributes } from "react";
import { Button, ButtonProps } from "./button";
import { LucideProps } from "lucide-react";

export interface ButtonTabProps extends ButtonProps {
  selected?: boolean;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  afterIcon?: React.ReactNode;
}

export const ButtonTab = React.forwardRef<HTMLButtonElement, ButtonTabProps>(
  (
    { className, selected = false, icon: Icon, afterIcon, children, ...props },
    ref
  ) => {
    return (
      <Button
        variant={selected ? "secondary" : "ghost"}
        className={"justify-start"}
        ref={ref}
        {...props}
      >
        {Icon && <Icon size={32} absoluteStrokeWidth />}
        {children}
        {afterIcon ? (
          <>
            <div className={"basis-full"}></div>
            {afterIcon}
          </>
        ) : (
          <></>
        )}
      </Button>
    );
  }
);
