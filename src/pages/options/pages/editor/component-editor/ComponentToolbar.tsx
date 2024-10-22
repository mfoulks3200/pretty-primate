import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { IconButton } from "@/src/pages/common/IconButton";
import { useEditor } from "@craftjs/core";
import { Bug, Redo, Undo } from "lucide-react";

export const ComponentToolbar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div className={"p-1 h-fit max-h-fit border-b border-b-border flex gap-1"}>
      <div className={"flex gap-1"}>
        <IconButton icon={Undo} onClick={() => {}} tooltip={"Undo"} />
        <IconButton icon={Redo} onClick={() => {}} tooltip={"Redo"} />
        <IconButton
          icon={Bug}
          onClick={() => {
            console.log(JSON.parse(query.serialize()));
          }}
          tooltip={"Serialize"}
        />
      </div>
      <div className={"basis-full"}></div>
      <div>
        <Select
          defaultValue="edit"
          onValueChange={(value) => {
            actions.setOptions(
              (options) => (options.enabled = value == "edit")
            );
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="edit">Edit Mode</SelectItem>
            <SelectItem value="preview">Preview Mode</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
