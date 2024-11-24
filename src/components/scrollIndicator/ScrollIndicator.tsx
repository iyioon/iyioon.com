import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ScrollIndicator.module.css";

export default function ScrollIndicator() {
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const location = useLocation();

  // Scroll percentage of the content
  useEffect(() => {
    const content = document.querySelector(".content");

    if (content) {
      const handleScroll = () => {
        const scrollTop = content.scrollTop;
        const viewportHeight = content.clientHeight;
        const totalHeight = content.scrollHeight;

        // Calculate percentage based on how much of the bottom is visible
        const scrollBottom = scrollTop + viewportHeight;
        const percentage = (scrollBottom / totalHeight) * 100;

        // Clamp between 0-100
        setScrollPercentage(Math.min(100, Math.max(0, Math.round(percentage))));
      };

      content.addEventListener("scroll", handleScroll);
      // Initial calculation
      handleScroll();

      return () => content.removeEventListener("scroll", handleScroll);
    }
  }, [location.pathname]);

  const scrollToTop = () => {
    const content = document.querySelector(".content");
    if (content) {
      content.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={styles["scroll-indicator"]} onClick={scrollToTop}>
      {scrollPercentage}%
    </div>
  );
}
