import {
  Userscript,
  UserscriptManager,
  UserscriptTarget,
  UserscriptTargetType,
} from "@/src/common/Userscript";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/src/components/ui/select";
import { IconButton } from "@/src/pages/common/IconButton";
import { SelectTrigger } from "@radix-ui/react-select";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

export const TargetsPanel = ({ userscript }: { userscript: Userscript }) => {
  const [targets, setTargets] = useState<UserscriptTarget[]>([
    ...userscript.targets,
  ]);

  const createTarget = () => {
    const target: UserscriptTarget = { value: "*://*", targetType: "include" };
    userscript.targets.push(target);
    UserscriptManager.save();
    setTargets([...userscript.targets]);
  };

  const deleteTarget = (index: number) => {
    userscript.targets = userscript.targets.filter((_, i) => i !== index);
    UserscriptManager.save();
    setTargets([...userscript.targets]);
  };

  const updateTarget = (index: number, target: UserscriptTarget) => {
    userscript.targets = userscript.targets.map((t, i) =>
      i === index ? target : t
    );
    UserscriptManager.save();
    setTargets([...userscript.targets]);
  };

  return (
    <>
      {targets.map((target, index) => (
        <TargetField
          key={index}
          target={target}
          onDelete={function (): void {
            deleteTarget(index);
          }}
          onUpdate={function (target: UserscriptTarget): void {
            updateTarget(index, target);
          }}
        />
      ))}
      <Button variant="outline" onClick={() => createTarget()}>
        <Plus />
        Add Target
      </Button>
    </>
  );
};

const TargetField = ({
  target,
  onDelete,
  onUpdate,
}: {
  target: UserscriptTarget;
  onDelete: () => void;
  onUpdate: (target: UserscriptTarget) => void;
}) => {
  return (
    <div className={"flex gap-2"}>
      <Input
        placeholder={"*://*"}
        value={target.value}
        onChange={(e) =>
          onUpdate({ value: e.target.value, targetType: target.targetType })
        }
      />
      <Select
        defaultValue={target.targetType}
        onValueChange={(newType) =>
          onUpdate({
            value: target.value,
            targetType: newType as UserscriptTargetType,
          })
        }
      >
        <SelectTrigger className="w-[180px]">
          <Button variant="outline" className="w-full">
            <SelectValue />
          </Button>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="include">Include</SelectItem>
          <SelectItem value="exclude">Exclude</SelectItem>
        </SelectContent>
      </Select>
      <IconButton
        icon={Trash2}
        tooltip={"Delete Target"}
        onClick={() => onDelete()}
      />
    </div>
  );
};
