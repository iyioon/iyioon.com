import React from "react";
import styles from "./Home.module.css";
import IyioonBg from "../../components/iyioonBG/IyioonBG";
import ConstructionIcon from "@mui/icons-material/Construction";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
};

function Home({ assets }: HomeProps) {
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
