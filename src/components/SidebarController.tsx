import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./ui/resizable";
import { ButtonTab } from "./ui/button-tab";
import { useNavigate } from "react-router";

export interface SidebarPage {
  id: string;
  title: string;
  type: "page";
  href: string;
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  afterIcon?: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

export interface SidebarAction {
  id: string;
  title: string;
  type: "action";
  icon?: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  afterElement?: React.ReactNode;
  onClick: () => void;
}

export interface SidebarHeader {
  title: string;
  type: "header";
}

export type SidebarItem = SidebarPage | SidebarAction | SidebarHeader;

interface SidebarControllerProps {
  pages: SidebarItem[];
  defaultPageId: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

export const SidebarController = ({
  pages,
  defaultPageId,
  header,
  footer,
}: SidebarControllerProps) => {
  const [active, setActive] = useState(defaultPageId);
  const navigate = useNavigate();

  return (
    <div className={"w-full basis-full flex"}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={15}>
          <div className="h-full flex flex-col">
            {header ? header : null}
            <div className="flex flex-col gap-1 p-4">
              {pages.map((page) => {
                if (page.type == "action") {
                  return (
                    <ButtonTab
                      key={page.id}
                      selected={page.id == active}
                      icon={page.icon}
                      onClick={() => {
                        page.onClick();
                      }}
                      afterIcon={page.afterElement}
                    >
                      {page.title}
                    </ButtonTab>
                  );
                } else if (page.type == "page") {
                  return (
                    <ButtonTab
                      key={page.id}
                      selected={page.id == active}
                      icon={page.icon}
                      afterIcon={page.afterIcon}
                      onClick={() => {
                        if (page.disabled) return;
                        setActive(page.id);
                        navigate(page.href);
                      }}
                      disabled={page.disabled ?? false}
                    >
                      {page.title}
                    </ButtonTab>
                  );
                } else if (page.type == "header") {
                  return (
                    <div
                      key={page.title}
                      className={
                        "text-gray-600 text-sm select-none ml-4 mt-4 mb-2"
                      }
                    >
                      {page.title}
                    </div>
                  );
                }
              })}
            </div>
            {footer ? (
              <>
                <div className="h-full"></div>
                {footer}
              </>
            ) : null}
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>
          <div
            className={"overflow-y-scroll"}
            style={{
              maxHeight: "calc( 100vh - 64px )",
              height: "calc( 100vh - 64px )",
            }}
          >
            {
              (
                pages.find(
                  (page) => page.type != "header" && page.id == active
                ) as SidebarPage
              ).children
            }
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};
