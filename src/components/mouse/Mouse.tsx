import React, { useEffect, useState } from "react";
import Styles from "./Mouse.module.css";

export default function Mouse() {
  // Mouse position
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={Styles.mouse}
      style={{
        transform: `translate(calc(${mousePos.x}px - 50%), calc(${mousePos.y}px - 50%))`,
        position: "fixed",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        background: "white",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 1000,
      }}
    />
  );
}
