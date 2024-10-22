import { Userscript, UserscriptManager } from "@/src/common/Userscript";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import { InputControl } from "@/src/pages/common/InputControl";

export const GeneralSettingsPanel = ({
  userscript,
}: {
  userscript: Userscript;
}) => {
  return (
    <>
      <InputControl
        title={"Script Name"}
        description={
          "The name of this script. This will be shown in the script browser."
        }
      >
        <Input
          defaultValue={userscript.name}
          onChange={(e) => {
            userscript.name = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Script Version"}
        description={
          "The version of this script. This will be shown in the script browser."
        }
      >
        <Input
          defaultValue={userscript.version}
          onChange={(e) => {
            userscript.version = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Script Description"}
        description={
          "The description of this script. This will be shown in the script browser."
        }
      >
        <Textarea
          defaultValue={userscript.description}
          onChange={(e) => {
            userscript.description = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Script Homepage"}
        description={"A link to the script's homepage, or documentation."}
      >
        <Input
          defaultValue={
            userscript.links.find((link) => link.name == "Homepage")?.url
          }
          onChange={(e) => {
            userscript.links.find((link) => link.name == "Homepage")!.url =
              e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Author Name"}
        description={"The name of the author."}
      >
        <Input
          defaultValue={userscript.author.name}
          onChange={(e) => {
            userscript.author.name = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Author Email"}
        description={"The email of the author."}
      >
        <Input
          defaultValue={userscript.author.email}
          onChange={(e) => {
            userscript.author.email = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
      <InputControl
        title={"Author Link"}
        description={"A link to the authors profile."}
      >
        <Input
          defaultValue={userscript.author.url}
          onChange={(e) => {
            userscript.author.url = e.target.value;
            UserscriptManager.save();
          }}
        />
      </InputControl>
    </>
  );
};
