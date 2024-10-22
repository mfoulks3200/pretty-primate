import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";

interface IconButtonProps {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  onClick?: () => void;
  className?: string;
  tooltip: string;
  tooltipDirection?: "top" | "bottom" | "left" | "right";
  variant?:
    | "ghost"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "link";
  disabled?: boolean;
}

export const IconButton = ({
  icon: Icon,
  onClick,
  className,
  tooltip,
  tooltipDirection,
  variant,
  disabled,
}: IconButtonProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button
            variant={variant ?? "ghost"}
            className={"px-3 " + className}
            onClick={() => onClick?.()}
            disabled={disabled}
          >
            <Icon absoluteStrokeWidth />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={tooltipDirection}>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const IconButtonConfirmation = ({
  icon: Icon,
  onConfirm,
  className,
  tooltip,
  confirmationMessage = "Are you sure?",
  confirmButton = "Confirm",
  dismissButton = "Dismiss",
  disabled,
}: Omit<IconButtonProps, "onClick"> & {
  onConfirm: () => void;
  confirmationMessage?: string;
  dismissButton?: string;
  confirmButton?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const confirmAction = () => {
    onConfirm();
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <PopoverTrigger>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                variant={"ghost"}
                className={"px-3 " + className}
                disabled={disabled}
              >
                <Icon absoluteStrokeWidth />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltip}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </PopoverTrigger>
      <PopoverContent>
        <div className={"flex flex-col gap-4 text-sm"}>
          {confirmationMessage}
          <div className={"flex gap-4 justify-end"}>
            <Button variant={"outline"} onClick={() => setIsOpen(false)}>
              {dismissButton}
            </Button>
            <Button variant={"destructive"} onClick={() => confirmAction()}>
              {confirmButton}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
