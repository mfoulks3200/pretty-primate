import { SettingsCategories, SettingsManager } from "@/src/common/Settings";
import { Section } from "@/src/pages/common/Section";
import { SettingControl } from "./SettingControl";

export const SettingCategory = ({ categoryId }: { categoryId: string }) => {
  let settings = SettingsManager.getDisplayableSettings(categoryId);
  if (settings != null && settings.length > 0) {
    return (
      <Section
        title={SettingsCategories[categoryId].title}
        description={SettingsCategories[categoryId].description}
      >
        {settings.map((setting) => (
          <SettingControl key={setting.id} setting={setting} />
        ))}
      </Section>
    );
  } else {
    return <></>;
  }
};
