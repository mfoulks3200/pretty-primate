import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DisplayableSettingsItem,
  SettingsManager,
} from "@/src/common/Settings";
import { capitalizeFirstLetter } from "@/src/common/Util";
import clsx from "clsx";
import { useState } from "react";

export const SettingControl = ({
  setting,
}: {
  setting: DisplayableSettingsItem;
}) => {
  const updateValue = (value: string) => {
    SettingsManager.setSetting(setting.id, value);
  };

  const [errorMessage, setErrorMessage] = useState<string>("");

  let control = <div className={"text-gray-600"}>Locked</div>;
  if (setting.control!.type === "select") {
    control = (
      <Select
        defaultValue={SettingsManager.getSettingValue(setting) as string}
        onValueChange={(value) => updateValue(value)}
      >
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {setting.enum!.map((value) => (
            <SelectItem key={value as string} value={value as string}>
              {capitalizeFirstLetter(value as string)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  } else if (setting.control!.type === "input") {
    control = (
      <div>
        <Input
          defaultValue={SettingsManager.getSettingValue(setting) as string}
          className={clsx({ "border-red-600": errorMessage.length > 0 })}
          onChange={(elem) => {
            if (
              setting.control!.regex &&
              !setting.control!.regex!.test(elem.target.value.toString())
            ) {
              setErrorMessage(setting.control!.errorMessage ?? "Invalid input");
            } else {
              updateValue(elem.target.value);
              setErrorMessage("");
            }
          }}
        />
        <div
          className={clsx("text-red-600", { hidden: errorMessage.length == 0 })}
        >
          {errorMessage}
        </div>
      </div>
    );
  }

  return (
    <div className={"flex gap-4 items-center"}>
      <div className={"flex flex-col gap-2 basis-1/2"}>
        <div className={"text-xl"}>{setting.title}</div>
        <div className={"text-gray-600"}>{setting.description}</div>
      </div>
      <div className={"basis-1/2"}>{control}</div>
    </div>
  );
};
