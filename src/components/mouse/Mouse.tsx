import React, { useEffect, useState } from "react";
import Styles from "./Mouse.module.css";

export default function Mouse() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isClickable, setIsClickable] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [idle, setIdle] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Add event listener for mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      const elementUnderCursor = document.elementFromPoint(
        e.clientX,
        e.clientY
      );

      if (elementUnderCursor) {
        // Check if the cursor style is 'pointer'
        const computedStyle = getComputedStyle(elementUnderCursor);
        setIsClickable(computedStyle.cursor === "pointer");

        // Or check if the elemtent has class 'clickable'
        if (elementUnderCursor.classList.contains("clickable")) {
          setIsClickable(true);
        } else {
          setIsClickable(computedStyle.cursor === "pointer");
        }
      } else {
        setIsClickable(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Add event listeners for mouse down and up
  useEffect(() => {
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Add event listener for idle
  useEffect(() => {
    let idleTimer: number;

    const resetIdle = () => {
      setIdle(false);
      clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIdle(true), 3000);
    };

    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("mousedown", resetIdle);
    window.addEventListener("mouseup", resetIdle);

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("mousedown", resetIdle);
      window.removeEventListener("mouseup", resetIdle);
    };
  }, []);

  // Add event listeners for mouse enter and leave of screen
  useEffect(() => {
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <div
      className={`${Styles.mouse} 
      ${isClickable ? Styles.mouseClickable : ""} 
      ${isPressed ? Styles.mousePressed : ""}
      ${idle ? Styles.mouseIdle : ""}
      ${!isVisible ? Styles.mouseOut : ""}
      `}
      style={{
        left: `${mousePos.x}px`,
        top: `${mousePos.y}px`,
      }}
    />
  );
}
