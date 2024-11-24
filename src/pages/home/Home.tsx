import React from "react";
import styles from "./Home.module.css";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

function Home({ assets }: HomeProps) {
  return (
    <div className={`${styles.home} zoomInFadeIn`}>
      <div className={styles.homeFirstPage}>
        <div className={styles.homeFirstPageContent}>
          <div className={styles.homeTitle}>
            Moon <br /> Ji Hoon
          </div>
          <div className={styles.homeSubtitle}>
            Studying <br /> Computer Science
          </div>
          <div className={styles.homeDate}>PORTFLIO 24/25</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
