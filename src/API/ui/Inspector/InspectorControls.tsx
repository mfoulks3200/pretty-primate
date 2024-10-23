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
import {
  ControlLimits,
  CSSNumericalValueControl,
} from "./CSSNumericalValueControl";
import { BoxValues } from "../css/CSSProps";
import { boxValuesToString } from "../css/CSSUtils";

export const InspectorControl = ({
  title,
  subtitle,
  id,
  children,
}: {
  title: string;
  subtitle?: string;
  id: string;
  children: React.ReactNode;
}) => {
  return (
    <AccordionItem value={id}>
      <AccordionTrigger className={"px-4 flex"}>
        <div className={"text-left select-none basis-1/2"}>{title}</div>
        {subtitle ? (
          <div className={"text-right select-none opacity-50 basis-1/2 pr-2"}>
            {subtitle}
          </div>
        ) : (
          <></>
        )}
      </AccordionTrigger>
      <AccordionContent>
        <div className={"flex flex-col gap-8 px-4"}>{children}</div>
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
  limits,
  beforeElements,
  afterElements,
}: {
  title: string;
  value: BoxValues;
  onChange: (newValue: BoxValues) => void;
  limits?: ControlLimits;
  beforeElements?: React.ReactNode;
  afterElements?: React.ReactNode;
}) => {
  const [top, setTop] = useState(value[0]);
  const [left, setLeft] = useState(value[1]);
  const [right, setRight] = useState(value[2]);
  const [bottom, setBottom] = useState(value[3]);

  useEffect(() => {
    onChange([top, left, right, bottom]);
  }, [top, left, right, bottom]);

  return (
    <InspectorControl
      title={title}
      subtitle={boxValuesToString([top, left, right, bottom])}
      id={title.toLowerCase().replaceAll(" ", "-")}
    >
      {beforeElements}
      <div className={"flex flex-col gap-2 w-full items-center justify-center"}>
        <div className={"flex gap-2 items-end justify-center"}>
          <div className={"border-l border-t border-border h-5 w-6"}></div>
          <CSSNumericalValueControl
            value={top}
            onChange={(newValue) => setTop(newValue)}
            limits={limits}
            className={"w-24"}
          />
          <div className={"border-r border-t border-border h-5 w-6"}></div>
        </div>
        <div className={"flex gap-2 items-center justify-center"}>
          <CSSNumericalValueControl
            value={left}
            onChange={(newValue) => setLeft(newValue)}
            limits={limits}
            className={"w-24"}
          />
          <div className={"w-10 h-10"}></div>
          <CSSNumericalValueControl
            value={right}
            onChange={(newValue) => setRight(newValue)}
            limits={limits}
            className={"w-24"}
          />
        </div>
        <div className={"flex gap-2 items-start justify-center"}>
          <div className={"border-l border-b border-border h-5 w-6"}></div>
          <CSSNumericalValueControl
            value={bottom}
            onChange={(newValue) => setBottom(newValue)}
            className={"w-24"}
          />
          <div className={"border-r border-b border-border h-5 w-6"}></div>
        </div>
      </div>
      {afterElements}
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
