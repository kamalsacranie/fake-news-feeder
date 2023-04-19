import React, { useEffect, useRef } from "react";

// export default function useDragger(ref: React.RefObject<HTMLDivElement>) {
//   const isClicked = useRef(false);
//   const coordinates = useRef({ startX: 0, startY: 0, endX: 0, endY: 0 });
//
//   useEffect(() => {
//     const getDraggableElement = (
//       element: HTMLElement
//     ): HTMLElement | undefined => {
//       if (
//         element.className.split(" ").find((cls) => cls === "absolute")?.length
//       )
//         return element;
//       if (!element.parentElement) return;
//       return getDraggableElement(element.parentElement);
//     };
//
//     const target = ref.current;
//     if (!target) throw Error("Element does not exist");
//     target.id = "jfdsklj";
//     const absolute = getDraggableElement(target);
//     ref.current.id = "now here";
//     if (!absolute) return;
//     // throw Error("No element with style of position: absolute in stack");
//
//     const parent = absolute.parentElement;
//     if (!parent) throw Error("Target element must have a parent");
//
//     const handleMouseDown = (e: MouseEvent) => {
//       isClicked.current = true;
//       coordinates.current.startX = e.clientX;
//       coordinates.current.startY = e.clientY;
//     };
//     const handleMouseUp = () => {
//       isClicked.current = false;
//       coordinates.current.endX = absolute.offsetLeft;
//       coordinates.current.endY = absolute.offsetTop;
//     };
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isClicked.current) return;
//
//       const offsetX = coordinates.current.endX - coordinates.current.startX;
//       const offsetY = coordinates.current.endY - coordinates.current.startY;
//
//       absolute.style.left = `${e.clientX + offsetX}px`;
//       absolute.style.top = `${e.clientY + offsetY}px`;
//     };
//
//     absolute.addEventListener("mousedown", handleMouseDown);
//     absolute.addEventListener("mouseup", handleMouseUp);
//     parent.addEventListener("mousemove", handleMouseMove);
//     parent.addEventListener("mouseleave", handleMouseUp);
//
//     return () => {
//       absolute.removeEventListener("mousedown", handleMouseDown);
//       absolute.removeEventListener("mouseup", handleMouseUp);
//       parent.removeEventListener("mousemove", handleMouseMove);
//       parent.removeEventListener("mouseleave", handleMouseUp);
//     };
//   }, []);
// }
