import React, { useEffect } from "react";
import styles from "./Home.module.css";
import IyioonBg from "../../components/iyioonBG/IyioonBG";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useGlobal } from "../../utils/globalContext";

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
      <div className={styles.homeFirstPage}>
        <IyioonBg />
        <div className={styles.homeFirstPageContent}>
          <h1 onClick={toggleFullScreen}>???</h1>
          <div className={styles.underDevelopment}>
            Under Development
            <ConstructionIcon />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
