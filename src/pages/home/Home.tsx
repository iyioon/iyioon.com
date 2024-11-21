import React from "react";
import styles from "./Home.module.css";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

function Home({ assets }: HomeProps) {
  return (
    <div className={styles.home}>
      <div className={`${styles.thumbnail}`}>
        {getPreloadedAsset(assets, "wave.mp4", {
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        })}
      </div>
    </div>
  );
}

export default Home;
