import { MouseEventHandler, PropsWithChildren, useRef } from "react";

export const Draggable = ({ children }: PropsWithChildren) => {
  const isCliecked = useRef(false);
  const coordinates = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const getDraggableElement = (
    element: HTMLElement
  ): HTMLElement | undefined => {
    const className = element.className || "";
    if (className.split(" ").find((cls) => cls === "absolute")?.length)
      return element;
    if (!element.parentElement) return;
    return getDraggableElement(element.parentElement);
  };

  const handleMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    console.log("cli");
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    coordinates.current.startX = e.clientX;
    coordinates.current.startY = e.clientY;
    isCliecked.current = true;
  };
  const handleMouseUp: MouseEventHandler<HTMLElement> = (e) => {
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    isCliecked.current = false;
    coordinates.current.endX = draggable.offsetLeft;
    coordinates.current.endY = draggable.offsetTop;
  };
  const handleMouseMove: MouseEventHandler<HTMLElement> = (e) => {
    console.log("moe");
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    if (!isCliecked.current) return;

    const offsetX = coordinates.current.endX - coordinates.current.startX;
    const offsetY = coordinates.current.endY - coordinates.current.startY;

    draggable.style.left = `${e.clientX + offsetX}px`;
    draggable.style.top = `${e.clientY + offsetY}px`;
  };
  return (
    <div
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
    >
      {children}
    </div>
  );
};
