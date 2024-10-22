import { Home, Package, Pencil, RefreshCcwIcon, Trash } from "lucide-react";
import { Card } from "./Card";
import { Button } from "@/src/components/ui/button";
import { IconButton, IconButtonConfirmation } from "./IconButton";
import { Userscript, UserscriptManager } from "@/src/common/Userscript";
import { useNavigate } from "react-router";

export const ScriptTile = ({
  userscript,
  onUpdate,
}: {
  userscript: Userscript;
  onUpdate: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <Card className={"flex flex-col gap-4"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"text-xl"}>{userscript.name}</div>
        <div className={"text-gray-600 flex gap-2"}>
          <div>{userscript.author.name}</div>
          <div>Updated 10 minutes ago</div>
        </div>
      </div>
      <div className={"text-gray-600"}>{userscript.description}</div>
      <div className={"flex items-center"}>
        <IconButton
          icon={Pencil}
          tooltip={"Edit Script"}
          onClick={() => navigate(`/editor/${userscript.uuid}`)}
        />
        <IconButton
          icon={RefreshCcwIcon}
          tooltip={"Refresh Script"}
          disabled={true}
        />
        <IconButton icon={Home} tooltip={"Script Homepage"} disabled={true} />
        <IconButton icon={Package} tooltip={"Package Script"} disabled={true} />
        <IconButtonConfirmation
          icon={Trash}
          tooltip={"Delete Script"}
          onConfirm={() => {
            UserscriptManager.deleteUserscript(userscript.uuid);
            onUpdate();
          }}
          confirmationMessage={`Are you sure you want to delete "${userscript.name}"?`}
          confirmButton="Delete"
        />
        <div className={"basis-full text-right"}>{userscript.version}</div>
      </div>
    </Card>
  );
};
