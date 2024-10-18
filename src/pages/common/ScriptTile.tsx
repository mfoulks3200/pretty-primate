import { Home, Package, Pencil, RefreshCcwIcon } from "lucide-react";
import { Card } from "./Card";
import { Button } from "@/components/ui/button";
import { IconButton } from "./IconButton";

export const ScriptTile = () => {
  return (
    <Card className={"flex flex-col gap-4"}>
      <div className={"flex flex-col gap-2"}>
        <div className={"text-xl"}>Script name</div>
        <div className={"text-gray-600 flex gap-2"}>
          <div>Atlas Foulks</div>
          <div>Updated 10 minutes ago</div>
        </div>
      </div>
      <div className={"text-gray-600"}>
        This is a really long example description attached to the script.
      </div>
      <div className={"flex items-center"}>
        <IconButton icon={Pencil} tooltip={"Edit Script"} />
        <IconButton icon={RefreshCcwIcon} tooltip={"Refresh Script"} />
        <IconButton icon={Home} tooltip={"Script Homepage"} />
        <IconButton icon={Package} tooltip={"Package Script"} />
        <div className={"basis-full text-right"}>4.13.211</div>
      </div>
    </Card>
  );
};
