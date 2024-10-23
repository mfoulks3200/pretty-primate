import { Button } from "@/src/components/ui/button";
import { useNode, useEditor } from "@craftjs/core";
import { ROOT_NODE } from "@craftjs/utils";
import { ArrowUp, Move, SquareMousePointer, Trash } from "lucide-react";
import React, { useEffect, useRef, useCallback } from "react";
import ReactDOM from "react-dom";

export const RenderNode = ({ render }: any) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }));

  const {
    isHover,
    dom,
    name,
    moveable,
    deletable,
    connectors: { drag },
    parent,
  } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
    name: node.data.custom.displayName || node.data.displayName,
    moveable: query.node(node.id).isDraggable(),
    deletable: query.node(node.id).isDeletable(),
    parent: node.data.parent,
    props: node.data.props,
  }));

  const currentRef = useRef<HTMLDivElement>();
  const currentOutlineRef = useRef<HTMLDivElement>();

  useEffect(() => {
    if (dom) {
      if (isActive || isHover) dom.classList.add("component-selected");
      else dom.classList.remove("component-selected");
    }
  }, [dom, isActive, isHover]);

  const getPos = useCallback((dom: HTMLElement) => {
    const { top, left, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, bottom: 0 };
    return {
      top: `${top > 0 ? top : bottom}px`,
      left: `${left}px`,
    };
  }, []);

  const getOutlinePos = useCallback((dom: HTMLElement) => {
    const { top, left, right, bottom } = dom
      ? dom.getBoundingClientRect()
      : { top: 0, left: 0, right: 0, bottom: 0 };
    return {
      top: `${top}px`,
      left: `${left}px`,
      width: `${right - left}px`,
      height: `${bottom - top}px`,
    };
  }, []);

  const scroll = useCallback(() => {
    const { current: currentDOM } = currentRef;
    const { current: currentOutlineDOM } = currentOutlineRef;

    if (!currentDOM) return;
    const { top, left } = getPos(dom!);
    currentDOM.style.top = top;
    currentDOM.style.left = left;

    if (!currentOutlineDOM) return;
    const {
      top: outlineTop,
      left: outlineLeft,
      width,
      height,
    } = getOutlinePos(dom!);
    currentOutlineDOM.style.top = outlineTop;
    currentOutlineDOM.style.left = outlineLeft;
    currentOutlineDOM.style.width = width;
    currentOutlineDOM.style.height = height;
  }, [dom, getPos, getOutlinePos]);

  useEffect(() => {
    const rendererElem = document.querySelector(".craftjs-renderer");
    if (rendererElem) {
      rendererElem.addEventListener("scroll", scroll);
    }

    return () => {
      if (rendererElem) {
        rendererElem.removeEventListener("scroll", scroll);
      }
    };
  }, [scroll]);

  return (
    <>
      {isHover || isActive
        ? ReactDOM.createPortal(
            <>
              <div
                ref={currentRef as any}
                className="fixed flex gap-2 items-center bg-blue-600 p-1 h-9 -mt-9"
                style={{
                  left: getPos(dom!).left,
                  top: getPos(dom!).top,
                  zIndex: 10,
                }}
              >
                <h2 className="select-none px-2">{name}</h2>
                {moveable || id !== ROOT_NODE || deletable ? (
                  <div className={"flex"}>
                    <Button className="h-7 w-7" variant={"ghost"}>
                      <SquareMousePointer />
                    </Button>
                    {moveable ? (
                      <Button
                        className="h-7 w-7 cursor-move"
                        variant={"ghost"}
                        ref={drag as any}
                      >
                        <Move />
                      </Button>
                    ) : null}
                    {id !== ROOT_NODE && (
                      <Button
                        className="h-7 w-7"
                        variant={"ghost"}
                        onClick={() => {
                          actions.selectNode(parent!);
                        }}
                      >
                        <ArrowUp />
                      </Button>
                    )}
                    {deletable ? (
                      <Button
                        className="h-7 w-7"
                        variant={"ghost"}
                        onMouseDown={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          actions.delete(id);
                        }}
                      >
                        <Trash />
                      </Button>
                    ) : null}
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div
                ref={currentOutlineRef as any}
                className="fixed border bg-transparent pointer-events-none border-blue-600"
                style={{
                  left: getOutlinePos(dom!).left,
                  top: getOutlinePos(dom!).top,
                  width: getOutlinePos(dom!).width,
                  height: getOutlinePos(dom!).height,
                  zIndex: 10,
                }}
              ></div>
            </>,
            document.querySelector(".craftjs-renderer")!
          )
        : null}
      {render}
    </>
  );
};
