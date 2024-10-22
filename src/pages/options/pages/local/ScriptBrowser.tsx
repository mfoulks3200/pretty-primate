import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/src/components/ui/select";
import { Userscript, UserscriptManager } from "@/src/common/Userscript";
import { ScriptTile } from "@/src/pages/common/ScriptTile";
import { SelectTrigger } from "@radix-ui/react-select";
import { Filter, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const ScriptBrowser = () => {
  const navigate = useNavigate();
  const [userscripts, setUserscripts] = useState<Userscript[]>(
    UserscriptManager.getUserscripts()
  );

  const createUserScript = () => {
    const userscript = UserscriptManager.createUserscript();
    navigate(`/editor/${userscript.uuid}`);
  };

  const updateScripts = () => {
    setUserscripts(UserscriptManager.getUserscripts());
  };

  return (
    <div className={"p-8 pt-0 flex flex-col"}>
      <div className={"flex gap-4 sticky top-0 bg-background py-8"}>
        <Input placeholder="Search" />
        <Select defaultValue="custom">
          <SelectTrigger className="w-52 px-2 border border-border bg-background rounded-md flex gap-2 items-center justify-center">
            <Filter absoluteStrokeWidth />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="custom">Custom</SelectItem>
            <SelectItem value="last-created">Last Created</SelectItem>
            <SelectItem value="last-updated">Last Updated</SelectItem>
            <SelectItem value="my-scripts">My Scripts</SelectItem>
            <SelectItem value="not-my-scripts">External Scripts</SelectItem>
            <SelectItem value="enabled">Enabled</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={() => createUserScript()}>
          <Plus absoluteStrokeWidth />
          New Script
        </Button>
      </div>
      {userscripts.length > 0 ? (
        <div className={"grid grid-cols-3 gap-8"}>
          {userscripts.map((userscript) => (
            <ScriptTile
              userscript={userscript}
              onUpdate={() => updateScripts()}
            />
          ))}
        </div>
      ) : (
        <ScriptBrowserEmpty onClick={createUserScript} />
      )}
    </div>
  );
};

const ScriptBrowserEmpty = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className={
        "w-full h-full min-h-52 flex flex-col items-center justify-center gap-4"
      }
    >
      <div className={"text-4xl"}>No Scripts Found</div>
      <div className={"text-gray-600 text-center"}>
        You don't have any scripts yet. Click the button below to create a new
        script.
      </div>
      <Button onClick={onClick}>
        <Plus />
        New Script
      </Button>
    </div>
  );
};
