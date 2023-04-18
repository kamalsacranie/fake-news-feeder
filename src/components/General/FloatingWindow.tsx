import {
  createRef,
  MouseEventHandler,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollView } from "react95";
import useDragger from "../../hooks/useDragger";
import { WindowBar } from "../WindowBar";

export default ({ children }: PropsWithChildren) => {
  const [clicked, setClicked] = useState(false);
  const coordinates = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });

  const getDraggableElement = (
    element: HTMLElement
  ): HTMLElement | undefined => {
    if (element.className.split(" ").find((cls) => cls === "absolute")?.length)
      return element;
    if (!element.parentElement) return;
    return getDraggableElement(element.parentElement);
  };

  const handleMouseDown: MouseEventHandler<HTMLElement> = (e) => {
    console.dir(e);
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    setClicked(true);
    coordinates.current.startX = e.clientX;
    coordinates.current.startY = e.clientY;
  };
  const handleMouseUp: MouseEventHandler<HTMLElement> = (e) => {
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    setClicked(false);
    coordinates.current.endX = draggable.offsetLeft;
    coordinates.current.endY = draggable.offsetTop;
  };
  const handleMouseMove: MouseEventHandler<HTMLElement> = (e) => {
    if (!e.target) return;
    const draggable = getDraggableElement(e.target as HTMLElement);
    if (!draggable) return;
    if (!clicked) return;

    const offsetX = coordinates.current.endX - coordinates.current.startX;
    const offsetY = coordinates.current.endY - coordinates.current.startY;

    draggable.style.left = `${e.clientX + offsetX}px`;
    draggable.style.top = `${e.clientY + offsetY}px`;
  };

  return (
    <div style={{ zIndex: 999 }} className="relative">
      <div className="absolute h-80 w-80">
        <div
          onMouseUp={handleMouseUp}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
        >
          <WindowBar windowTitle="temp" />
        </div>
        <ScrollView>
          Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit
          enim labore culpa sint ad nisi Lorem pariatur mollit ex esse
          exercitation amet. Nisi anim cupidatat excepteur officia.
          Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate
          voluptate dolor minim nulla est proident. Nostrud officia pariatur ut
          officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit
          commodo officia dolor Lorem duis laboris cupidatat officia voluptate.
          Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis
          officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis
          sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea
          consectetur et est culpa et culpa duis.
        </ScrollView>
      </div>
    </div>
  );
};
