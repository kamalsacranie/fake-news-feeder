import React, { useState, MouseEventHandler } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
};

const FloatingWindow: React.FC<Props> = ({ title, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove: MouseEventHandler = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;
    setPos((prevPos) => ({ x: prevPos.x + dx, y: prevPos.y + dy }));
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div
      style={{
        position: "fixed",
        top: pos.y,
        left: pos.x,
        border: "1px solid black",
        borderRadius: "4px",
        padding: "8px",
        backgroundColor: "white",
        zIndex: 9999,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ fontWeight: "bold" }}>{title}</div>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setPos({ x: 0, y: 0 })}
        >
          X
        </div>
      </div>
      {children}
    </div>
  );
};

export default FloatingWindow;
