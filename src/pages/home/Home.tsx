import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useGlobal } from "../../utils/globalContext";
import { getPreloadedAsset } from "../../utils/assetsUtils";

function Home() {
  const { globals, register } = useGlobal();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={`${styles.home} zoomInFadeIn`}>
      <div className={styles.paper}>
        {getPreloadedAsset(globals.assets, "paper.jpg", {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "grayscale(100%)",
        })}
        <div className={styles.paperOverlay} />
      </div>

      <div className={styles.titleHolder}>
        <div className={styles.title}>
          {getPreloadedAsset(globals.assets, "signature.svg", {
            width: "100%",
            height: "100%",
            border: "1px solid red",
            transform: "scale(1.5)",
          })}
        </div>
        <div className={styles.subtitle}>PORTFOLIO SINCE 2021</div>
        <div className={styles.description}>
          Website under redesign. Please check back later.
        </div>
      </div>
    </div>
  );
}

export default Home;
