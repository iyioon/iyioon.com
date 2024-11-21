import React from "react";
import styles from "./Home.module.css";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

function Home({ assets }: HomeProps) {
  return (
    <div className={`${styles.home} zoomInFadeIn`}>
      <div className={`${styles.thumbnail}`}>
        {getPreloadedAsset(
          assets,
          "wave.mp4",
          {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          },
          {
            loop: true,
            muted: true,
            autoPlay: true,
            playsInline: true,
          },
          0
        )}
      </div>
    </div>
  );
}

export default Home;
