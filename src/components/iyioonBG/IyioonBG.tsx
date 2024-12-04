import React, { useEffect, useRef, useState } from "react";
import styles from "./IyioonBG.module.css";

function IyioonBG() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      // Use window coordinates instead of container-relative
      const x = ((e.pageX - window.scrollX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.pageY - window.scrollY - rect.top) / rect.height) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const warpStyle = {
    transform: `perspective(1000px) 
                rotateX(${mousePosition.y * 5}deg) 
                rotateY(${mousePosition.x * 5}deg)
                scale(1.05)`,
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
      <div className={styles.aboutBGContent} style={warpStyle}>
        {textlist.map((text, index) => (
          <h1 key={index}>{text}</h1>
        ))}
      </div>
    </div>
  );
}

export default IyioonBG;
