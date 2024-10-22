import { SettingsCategories } from "@/src/common/Settings";
import { SettingCategory } from "./settings/SettingCategory";

export const SettingsPage = () => {
  return (
    <div className={"p-8 flex flex-col gap-4"}>
      <div className={"text-4xl"}>Settings</div>
      <div className={"w-full flex flex-col items-center"}>
        <div className={"w-2/3 min-w-96 flex flex-col gap-10"}>
          {Object.entries(SettingsCategories).map(([name, category]) => (
            <SettingCategory key={name} categoryId={name} />
          ))}
        </div>
      </div>
    </div>
  );
};
