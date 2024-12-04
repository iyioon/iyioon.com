import React, { useEffect, useRef, useState } from "react";
import styles from "./IyioonBG.module.css";

interface IyioonBGProps {
  brightness: number;
}

function IyioonBGDark({ brightness }: IyioonBGProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePosition({ x, y });
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const warpStyle = {
    transform: `perspective(1000px) 
                rotateX(${mousePosition.y * 5}deg) 
                rotateY(${mousePosition.x * 5}deg)
                scale(1.05)`,
    color: `rgb(${20 + (brightness * 50) / 100}, 
                 ${20 + (brightness * 50) / 100}, 
                 ${20 + (brightness * 50) / 100})`,
  };

  const textlist = [
    "iyioon Moon Ji Hoon",
    "Moon Ji Hoon iyioon",
    "Ji Hoon Moon iyioon",
    "iyioon Moon Ji Hoon",
    "Moon Ji Hoon iyioon",
    "Ji Hoon Moon iyioon",
    "iyioon Moon Ji Hoon",
    "Moon Ji Hoon iyioon",
    "Ji Hoon Moon iyioon",
  ];

  return (
    <div className={styles.aboutBG} ref={containerRef}>
      <div className={styles.aboutBGContentDark} style={warpStyle}>
        {textlist.map((text, index) => (
          <h1 key={index}>{text}</h1>
        ))}
      </div>
    </div>
  );
}

export default IyioonBGDark;
