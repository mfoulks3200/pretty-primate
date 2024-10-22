import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { InputControl } from "@/src/pages/common/InputControl";
import { Section } from "@/src/pages/common/Section";
import { GeneralSettingsPanel } from "./GeneralSettingsPanel";
import { TargetsPanel } from "./TargetsPanel";
import { FilesPanel } from "./FilesPanel";
import { Userscript } from "@/src/common/Userscript";

export const ScriptSettings = ({ userscript }: { userscript: Userscript }) => {
  return (
    <div className={"p-8 flex flex-col gap-4"}>
      <div className={"text-4xl"}>Script Settings</div>
      <div className={"w-full flex flex-col items-center"}>
        <div className={"w-2/3 min-w-96 flex flex-col gap-10"}>
          <Section title={"General Settings"}>
            <GeneralSettingsPanel userscript={userscript} />
          </Section>
          <Section title={"Targets"}>
            <TargetsPanel userscript={userscript} />
          </Section>
          <Section title={"Files"}>
            <FilesPanel userscript={userscript} />
          </Section>
        </div>
      </div>
    </div>
  );
};
