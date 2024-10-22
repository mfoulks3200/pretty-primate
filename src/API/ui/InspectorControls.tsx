import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Button } from "@/src/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Slider } from "@/src/components/ui/slider";
import { Textarea } from "@/src/components/ui/textarea";
import { useEffect, useState } from "react";

export const InspectorControl = ({
  title,
  id,
  children,
}: {
  title: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent>
        <div className={"flex flex-col gap-4"}>{children}</div>
      </AccordionContent>
    </AccordionItem>
  );
};

type BoxSide =
  | "all"
  | "horizontal"
  | "vertical"
  | "top"
  | "right"
  | "bottom"
  | "left";

export const BoxModelControl = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: {
    top: number;
    left: number;
    right: number;
    bottom: number;
  };
  onChange: (top: number, left: number, right: number, bottom: number) => void;
}) => {
  const [currentSide, setCurrentSide] = useState<BoxSide>("all");
  const [top, setTop] = useState(value.top);
  const [left, setLeft] = useState(value.left);
  const [right, setRight] = useState(value.right);
  const [bottom, setBottom] = useState(value.bottom);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    onChange(top, left, right, bottom);
  }, [top, left, right, bottom]);

  const updateSideValue = (value: number) => {
    console.log("updateSideValue", value, currentSide);
    if (currentSide === "all") {
      setTop(value);
      setLeft(value);
      setRight(value);
      setBottom(value);
    } else if (currentSide === "horizontal") {
      setLeft(value);
      setRight(value);
    } else if (currentSide === "vertical") {
      setTop(value);
      setBottom(value);
    } else {
      if (currentSide === "top") {
        setTop(value);
      } else if (currentSide === "left") {
        setLeft(value);
      } else if (currentSide === "right") {
        setRight(value);
      } else if (currentSide === "bottom") {
        setBottom(value);
      }
    }
    setSliderValue(value);
  };

  const resetSideValue = () => {
    updateSideValue(0);
    setSliderValue(0);
  };

  return (
    <InspectorControl title={title} id="box-model">
      <div className={"flex flex-col gap-2 w-full items-center justify-center"}>
        <div>{top}px</div>
        <div className={"flex gap-2 items-center justify-center"}>
          <div>{left}px</div>
          <div className={"w-12 h-12 border border-border"}></div>
          <div>{right}px</div>
        </div>
        <div>{bottom}px</div>
      </div>
      <Select
        defaultValue="all"
        onValueChange={(value) => {
          setCurrentSide(value as BoxSide);
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectSeparator />
          <SelectItem value="vertical">Vertical</SelectItem>
          <SelectItem value="horizontal">Horizontal</SelectItem>
          <SelectSeparator />
          <SelectItem value="top">Top</SelectItem>
          <SelectItem value="left">Left</SelectItem>
          <SelectItem value="right">Right</SelectItem>
          <SelectItem value="bottom">Bottom</SelectItem>
        </SelectContent>
      </Select>
      <Slider
        value={[sliderValue]}
        step={1}
        min={0}
        max={500}
        onValueChange={(value) => updateSideValue(value[0])}
      />
      <Button onClick={() => resetSideValue()}>Reset</Button>
    </InspectorControl>
  );
};

export const SliderControl = ({
  title,
  value,
  min,
  max,
  step,
  onChange,
  suffix,
}: {
  title: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  suffix?: string;
}) => {
  return (
    <InspectorControl title={title} id="slider-model">
      <div className={"flex gap-2"}>
        <Slider
          value={[value]}
          step={step}
          min={min}
          max={max}
          onValueChange={(value) => onChange(value[0])}
        />
        <div>{value + (suffix ?? "")}</div>
      </div>
    </InspectorControl>
  );
};

export const TextareaControl = ({
  title,
  value,
  onChange,
}: {
  title: string;
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <InspectorControl title={title} id="text-area">
      <Textarea value={value} onChange={(e) => onChange(e.target.value)} />
    </InspectorControl>
  );
};
