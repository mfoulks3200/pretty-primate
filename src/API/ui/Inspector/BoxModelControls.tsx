import { BoxModel } from "../css/CSSProps";
import { computeStyles } from "../css/CSSUtils";
import { ColorControl } from "./ColorControl";
import { BoxModelControl } from "./InspectorControls";

export const BoxModelControls = ({
  styles,
  setStyles,
}: {
  styles: BoxModel;
  setStyles: (styles: BoxModel) => void;
}) => {
  return (
    <div>
      <BoxModelControl
        title={"Padding"}
        value={styles.padding}
        limits={{
          min: 0,
        }}
        onChange={(newValue) => {
          const newStyles = computeStyles([
            {
              style: styles,
            },
            {
              style: {
                padding: newValue,
              },
            },
          ]);
          setStyles(newStyles);
        }}
      />
      <BoxModelControl
        title={"Margin"}
        value={styles.margin}
        onChange={(newValue) => {
          setStyles(
            computeStyles([
              {
                style: styles,
              },
              {
                style: {
                  margin: newValue,
                },
              },
            ])
          );
        }}
      />
      <BoxModelControl
        title={"Border"}
        value={styles.border.width}
        onChange={(newValue) => {
          setStyles(
            computeStyles([
              {
                style: styles,
              },
              {
                style: {
                  border: {
                    width: newValue,
                  },
                },
              },
            ])
          );
        }}
        afterElements={<ColorControl />}
      />
    </div>
  );
};
