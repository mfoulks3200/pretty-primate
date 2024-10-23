import { BoxModel, BoxValues, Color, CssNumericalValue, defaultBoxModel, RecursivePartial, ThemedColor } from "./CSSProps";

const instanceOfNumericValue = (object: any): object is CssNumericalValue => {
    return 'unit' in object && 'value' in object;
}

const instanceOfColor = (object: any): object is Color => {
    return ('type' in object && (object.type === 'hex' || object.type === 'rgb' || object.type === 'rgba')) || instanceOfThemedColor(object);
}

const instanceOfThemedColor = (object: any): object is ThemedColor => {
    return 'light' in object && 'dark' in object && instanceOfColor(object.light) && instanceOfColor(object.dark);
}

export const numericValueToString = (value: CssNumericalValue) => {
    if (value.unit === "calc") {
        return `calc( ${value.value} )`;
    } else {
        return `${value.value ?? 0}${value.unit}`;
    }
}

export const stringToNumericValue = (value: string): CssNumericalValue => {
    const unit = value.replace(/[0-9]/g, '');
    const number = parseFloat(value.replace(unit, ''));
    return {
        value: number,
        unit: unit as any,
    };
}

export const boxValueSort = (boxValue: BoxValues): BoxValues => {
    return [boxValue[0], boxValue[2], boxValue[3], boxValue[1]];
}

export const boxValuesToString = (boxValue: BoxValues) => {
    return boxValue.map((value) => numericValueToString(value)).join(" ");
};

export const colorValueToString = (color: Color, mode: "light" | "dark" = "dark"): string => {
    if (instanceOfThemedColor(color)) {
        return colorValueToString(color[mode as keyof typeof color]);
    } else {
        switch (color.type) {
            case "hex":
                return color.value;
            case "rgb":
                return `rgb(${color.red}, ${color.green}, ${color.blue})`;
            case "rgba":
                return `rgba(${color.red}, ${color.green}, ${color.blue}, ${color.alpha})`;
        }
    }
}

export const stringToColorValue = (color: string): Color => {
    if (color.startsWith("#")) {
        return {
            type: "hex",
            value: color,
        };
    } else if (color.startsWith("rgb")) {
        const [red, green, blue, alpha] = color
            .replace("rgb(", "")
            .replace("rgba(", "")
            .replace(")", "")
            .split(",")
            .map((val) => parseInt(val.trim()));
        if (alpha) {
            return {
                type: "rgba",
                red,
                green,
                blue,
                alpha,
            };
        } else {
            return {
                type: "rgb",
                red,
                green,
                blue,
            };
        }
    }
    return {
        type: "hex",
        value: "#000000",
    };
}

export const deepCopy = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj)) as T;
}

export const deepMerge = <T>(...objs: any[]): T => {
    let newObject: any = {};
    for (const obj of objs.map((original) => deepCopy(original))) {
        for (const [key, value] of Object.entries(obj)) {
            if (Object.hasOwn(newObject, key)) {
                if (typeof value !== 'object' || instanceOfNumericValue(value) || instanceOfColor(value) || Array.isArray(value)) {
                    if (typeof value === 'object' && instanceOfNumericValue(value) && value.value === undefined) {
                        continue;
                    }
                    if (Array.isArray(value)) {
                        for (let i = 0; i < value.length; i++) {
                            if (instanceOfNumericValue(value[i]) && value[i].value === undefined) {
                                continue;
                            } else {
                                newObject[key][i] = value[i];
                            }
                        }
                    } else {
                        newObject[key] = value;
                    }
                } else {
                    newObject[key] = deepMerge<T>(newObject[key], value);
                }
            } else {
                newObject[key] = value;
            }
        }
    }
    return newObject as T;
}

export const diffStyles = (style1: BoxModel, style2: BoxModel): RecursivePartial<BoxModel> => {
    return Object.keys(style1 ?? {}).reduce((diff, key) => {
        if (
            style2[key as keyof typeof style2] ===
            style1![key as keyof typeof style1]
        )
            return diff;
        return {
            ...diff,
            [key]: style1![key as keyof typeof style1],
        };
    }, {});
}

export const computeStyles = (additionalStyles: { style: RecursivePartial<BoxModel>, disabled?: boolean }[]): BoxModel => {

    const enabledAdditionalStyles = additionalStyles ? additionalStyles.filter((style) => !style.disabled).map((style) => style.style) : [];

    return deepMerge<BoxModel>(
        ...enabledAdditionalStyles
    );
}

export const boxModelToCssProps = (styles: BoxModel): React.CSSProperties => {
    const cssProps = {
        padding: boxValuesToString(boxValueSort(styles.padding)),
        margin: boxValuesToString(boxValueSort(styles.margin)),

        borderWidth: boxValuesToString(boxValueSort(styles.border.width)),
        borderColor: colorValueToString(styles.border.color),
        borderStyle: styles.border.style,

        backgroundColor: colorValueToString(styles.background.color),

        color: colorValueToString(styles.text.color),
        fontSize: numericValueToString(styles.text.size),
        textAlign: styles.text.align,
    }
    return cssProps;
}