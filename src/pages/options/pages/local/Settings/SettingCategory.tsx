import { SettingsCategories, SettingsManager } from "@/src/common/Settings";
import { SettingControl } from "./SettingControl";
import { Card } from "@/src/pages/common/Card";

export const SettingCategory = ({ categoryId }: { categoryId: string }) => {
  let settings = SettingsManager.getDisplayableSettings(categoryId);
  if (settings != null && settings.length > 0) {
    return (
      <div className={"flex flex-col gap-4"}>
        <div className={"flex flex-col gap-1"}>
          <div className={"text-2xl"}>
            {SettingsCategories[categoryId].title}
          </div>
          <div className={"text-gray-600"}>
            {SettingsCategories[categoryId].description}
          </div>
        </div>
        <Card className={"flex flex-col gap-8"}>
          {settings.map((setting) => (
            <SettingControl key={setting.id} setting={setting} />
          ))}
        </Card>
      </div>
    );
  } else {
    return <></>;
  }
};
