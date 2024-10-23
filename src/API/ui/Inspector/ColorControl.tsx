import { Button } from "@/src/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/src/components/ui/popover";
import { Slider } from "@/src/components/ui/slider";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip";
import { useState } from "react";

import Colors from "tailwindcss/colors";

export const ColorControl = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant={"ghost"} className={"w-full p-2"}>
          <div className={"flex gap-2 items-center w-full"}>
            <div className={"basis-full text-left"}>Blue 700</div>
            <div className={"min-w-7 min-h-7 rounded-sm bg-blue-700"}></div>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};

const ColorSwatch = ({
  color,
  onClick,
  onHover,
}: {
  color: string;
  onHover?: () => void;
  onClick?: () => void;
}) => {
  return (
    <div
      className={"min-w-7 min-h-7 rounded-sm"}
      style={{ backgroundColor: color }}
      onClick={onClick}
      onMouseEnter={onHover}
    ></div>
  );
};

export const ColorControlContent = () => {
  return (
    <div
      className={
        "w-80 min-w-80 p-4 border border-border rounded-md fixed top-20 left-20 z-50 bg-background"
      }
    >
      <div className={"w-full h-ful flex flex-col"}>
        <Tabs defaultValue="picker" className="w-full">
          <TabsList className={"w-full flex"}>
            <TabsTrigger className={"basis-full"} value="token">
              Token
            </TabsTrigger>
            <TabsTrigger className={"basis-full"} value="picker">
              Picker
            </TabsTrigger>
          </TabsList>
          <TabsContent value="token">
            <ColorControlTokenContent />
          </TabsContent>
          <TabsContent value="picker">
            <ColorControlPickerContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const ColorControlPickerContent = () => {
  const [hue, setHue] = useState<number>(0);
  const [pos, setPos] = useState<[number, number]>([0, 0]);
  const [saturation, setSaturation] = useState<number>(0);
  const [lightness, setLightness] = useState<number>(0);
  const [mouseDown, setMouseDown] = useState<boolean>(false);

  const updateColorPosition = (e: MouseEvent, updateImmedately = false) => {
    if (mouseDown || updateImmedately) {
      const rect = (e.target as HTMLDivElement).getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPos([x, y]);
      const sat = x / rect.width;
      setSaturation(sat);
      // prettier-ignore
      setLightness((1 - (y / rect.height)) / (sat + 1));
    }
  };

  return (
    <div className={"flex flex-col gap-4"}>
      <div
        className={
          "w-full h-60 bg-white overflow-hidden border border-border rounded-md"
        }
        onMouseDown={(e) => {
          setMouseDown(true);
          updateColorPosition(e as any, true);
        }}
        onMouseUp={() => setMouseDown(false)}
        onMouseLeave={() => setMouseDown(false)}
        onMouseMove={(e) => updateColorPosition(e as any)}
      >
        <svg
          width="100%"
          height="100%"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="brightness" x1="0" x2="0" y1="0" y2="1">
              <stop className="stop1" stopColor="white" offset="0%" />
              <stop className="stop3" stopColor="black" offset="100%" />
            </linearGradient>
            <linearGradient id="hue">
              <stop offset="0%" stopColor="white" />
              <stop offset="100%" stopColor={`hsl(${hue}deg 100% 50%)`} />
            </linearGradient>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#brightness)"
          />
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#hue)"
            style={{ mixBlendMode: "multiply" }}
          />
          <circle
            cx={pos[0]}
            cy={pos[1]}
            r="12"
            stroke="white"
            strokeWidth={2}
            fill={`hsl(${hue}deg ${saturation * 100}% ${lightness * 100}%)`}
            style={{ pointerEvents: "none" }}
          />
        </svg>
      </div>
      <Slider
        value={[hue]}
        min={0}
        max={360}
        step={1}
        onValueChange={(val) => setHue(val[0])}
      />
    </div>
  );
};

const ColorControlTokenContent = () => {
  const [baseColor, setBaseColor] = useState<{ [k: string]: string } | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [baseColorName, setBaseColorName] = useState<string>("None");

  const updateBaseColor = (
    baseColor: { [k: string]: string },
    name: string
  ) => {
    setBaseColor(baseColor);
  };

  const selectColor = (name: string, color: string) => {
    setBaseColorName(name);
    setSelectedColor(color);
  };

  return (
    <div className={"flex flex-col gap-2"}>
      <div
        className={"text-center rounded-md p-2"}
        style={{
          backgroundColor:
            selectedColor ??
            (baseColor !== null ? baseColor["600"] : "rgba(125, 125, 125 0.5)"),
        }}
      >
        {baseColorName}
      </div>
      <div className={"flex justify-between"}>
        <ColorSwatch
          color={Colors.red[600]}
          onHover={() => updateBaseColor(Colors.red, "Red")}
          onClick={() => selectColor("Red 600", Colors.red[600])}
        />
        <ColorSwatch color={Colors.orange[600]} />
        <ColorSwatch color={Colors.yellow[600]} />
        <ColorSwatch color={Colors.green[600]} />
        <ColorSwatch color={Colors.cyan[600]} />
        <ColorSwatch color={Colors.blue[600]} />
        <ColorSwatch color={Colors.purple[600]} />
        <ColorSwatch color={Colors.gray[600]} />
      </div>
      <div className={"flex justify-between"}>
        {baseColor !== null &&
          Object.entries(baseColor)
            .slice(0, 8)
            .map(([shade, color]) => (
              <ColorSwatch
                color={color}
                onClick={() => selectColor(`${baseColorName} ${shade}`, color)}
              />
            ))}
      </div>
    </div>
  );
};
