import React from "react";
import styles from "./Home.module.css";
import IyioonBg from "../../components/iyioonBG/IyioonBG";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

function Home({ assets }: HomeProps) {
  return (
    <div className={`${styles.home} zoomInFadeIn`}>
      <div className={styles.homeFirstPage}>
        <IyioonBg />
      </div>
    </div>
  );
}

export default Home;
