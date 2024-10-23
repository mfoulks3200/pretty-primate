import { DraggableSpinner } from "@/src/components/ui/draggable-spinner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useCallback, useEffect, useState } from "react";
import { CssNumericalValue, CssUnit } from "../css/CSSProps";

export interface ControlLimits {
  min?: number;
  max?: number;
}

export const CSSNumericalValueControl = ({
  value,
  onChange,
  className,
  limits,
}: {
  value: CssNumericalValue;
  onChange?: (newValue: CssNumericalValue) => void;
  className?: string;
  limits?: ControlLimits;
}) => {
  const [currentValue, setCurrentValue] = useState(value.value ?? 0);
  const [currentUnit, setCurrentUnit] = useState<CssUnit>(value.unit ?? "px");

  const updateValue = useCallback(
    (value: number) => {
      if (limits && limits?.min !== undefined && value < limits.min) {
        setCurrentValue(limits.min);
        return;
      }
      if (limits && limits?.max !== undefined && value > limits.max) {
        setCurrentValue(limits.max);
        return;
      }
      setCurrentValue(value);
    },
    [currentValue]
  );

  useEffect(() => {
    onChange?.({
      value: currentValue,
      unit: currentUnit,
    });
  }, [currentValue, currentUnit]);

  return (
    <div className={"flex " + className}>
      <DraggableSpinner
        value={currentValue}
        onValueChange={(value) => {
          updateValue(value);
        }}
        className={
          "rounded-r-none border-r-0 ring-0 active:ring-0 pr-0 cursor-ns-resize focus-visible:outline-none focus-visible:ring-0"
        }
      />
      <Select
        value={currentUnit}
        onValueChange={(newUnit) => setCurrentUnit(newUnit as CssUnit)}
      >
        <SelectTrigger
          className={"rounded-l-none border-l-0 ring-0 w-fit px-1 focus:ring-0"}
        >
          <div className={"px-1"}>
            <SelectValue />
          </div>
        </SelectTrigger>
        <SelectContent collisionPadding={50}>
          <SelectGroup>
            <SelectLabel>Absolute</SelectLabel>
            <SelectItem value="px">px</SelectItem>
            <SelectItem value="cm">cm</SelectItem>
            <SelectItem value="mm">mm</SelectItem>
            <SelectItem value="in">in</SelectItem>
            <SelectItem value="pt">pt</SelectItem>
            <SelectItem value="pc">pc</SelectItem>
          </SelectGroup>
          <SelectGroup>
            <SelectSeparator />
            <SelectLabel>Relative</SelectLabel>
            <SelectItem value="em">em</SelectItem>
            <SelectItem value="ex">ex</SelectItem>
            <SelectItem value="ch">ch</SelectItem>
            <SelectItem value="rem">rem</SelectItem>
            <SelectItem value="vw">vw</SelectItem>
            <SelectItem value="vh">vh</SelectItem>
            <SelectItem value="vmin">vmin</SelectItem>
            <SelectItem value="vmax">vmax</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
