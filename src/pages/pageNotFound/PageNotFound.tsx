import React, { useEffect } from "react";
import styles from "./PageNotFound.module.css";
import scrollIndicatorStyles from "../../components/scrollIndicator/ScrollIndicator.module.css";

function PageNotFound() {
  // Remove the scroll indicator when the page is loaded
  useEffect(() => {
    const scrollIndicator = document.querySelector(
      `.${scrollIndicatorStyles["scroll-indicator"]}`
    );
    if (scrollIndicator) {
      console.log("Removing scroll indicator");
      scrollIndicator.setAttribute("style", "display: none");

      // Cleanup function that runs when component unmounts
      return () => {
        console.log("Restoring scroll indicator");
        scrollIndicator.setAttribute("style", "display: block");
      };
    }
  }, []);

  return (
    <div className={`${styles.pageNotFound} zoomInFadeIn`}>
      <h1>Why am I here?</h1>
      <p>It looks like the page you're looking for doesn't exist.</p>
    </div>
  );
}

export default PageNotFound;
