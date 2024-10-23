import Colors from "tailwindcss/colors";

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

type AbsoluteUnit = "px" | "cm" | "mm" | "in" | "pt" | "pc";
type RelativeUnit = "em" | "ex" | "ch" | "rem" | "vw" | "vh" | "vmin" | "vmax";
export type CssUnit = AbsoluteUnit | RelativeUnit | "calc";

export interface CssNumericalValue {
  value?: number;
  unit: CssUnit;
}

export type BoxValues = [
  CssNumericalValue,
  CssNumericalValue,
  CssNumericalValue,
  CssNumericalValue
];

export interface HexColor {
  type: "hex";
  value: string;
}

export interface RgbColor {
  type: "rgb";
  red: number;
  green: number;
  blue: number;
}

export interface RgbaColor {
  type: "rgba";
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export interface ThemedColor {
  light: Color;
  dark: Color;
}

export type Color = HexColor | RgbColor | RgbaColor | ThemedColor;

export interface BoxModel {
  padding: BoxValues;
  margin: BoxValues;
  border: {
    width: BoxValues;
    style:
    | "dotted"
    | "dashed"
    | "solid"
    | "double"
    | "groove"
    | "ridge"
    | "inset"
    | "outset"
    | "none"
    | "hidden";
    color: Color;
    radius: CssNumericalValue
  };
  background: {
    color: Color;
  };
  text: {
    color: Color;
    align: "left" | "center" | "right" | "justify";
    size: CssNumericalValue;
    family: string;
  };
}

export const defaultBoxModel: BoxModel = {
  padding: [
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
  ],
  margin: [
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
    { value: undefined, unit: "px" },
  ],
  border: {
    width: [
      { value: undefined, unit: "px" },
      { value: undefined, unit: "px" },
      { value: undefined, unit: "px" },
      { value: undefined, unit: "px" },
    ],
    style: "solid",
    color: { type: "hex", value: Colors.transparent },
    radius: { value: undefined, unit: "px" }
  },
  background: {
    color: { type: "hex", value: Colors.transparent },
  },
  text: {
    color: { type: "hex", value: Colors.black },
    align: "left",
    size: { value: 12, unit: "px" },
    family: "Arial",
  },
};

export const editModeBorder: RecursivePartial<BoxModel> = {
  border: {
    width: [
      { value: 1, unit: "px" },
      { value: 1, unit: "px" },
      { value: 1, unit: "px" },
      { value: 1, unit: "px" },
    ],
    style: "dashed",
    color: {
      dark: { type: "hex", value: Colors.gray[800] },
      light: { type: "hex", value: Colors.gray[800] }
    },
  },
};