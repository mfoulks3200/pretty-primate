import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { Outlet } from "react-router-dom";

export const Navigation = () => {
  return (
    <>
      <div
        className={
          "fixed top-0 h-16 min-h-16 max-h-16 w-full border-b border-b-slate-800 flex items-center px-4 gap-4 bg-background/50 backdrop-blur-lg z-50"
        }
      >
        <div className={"flex items-center gap-2 select-none"}>
          <PawPrint />
          <div className={"text-2xl"}>Pretty Primate</div>
        </div>
        <div className={"flex items-center"}>
          <Button variant="ghost">Scripts</Button>
          <Button variant="ghost">Marketplace</Button>
        </div>
      </div>
      <div className={"h-16 min-h-16 max-h-16 w-full"}></div>
      <Outlet />
    </>
  );
};
