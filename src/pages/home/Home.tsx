import React from "react";
import styles from "./Home.module.css";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface HomeProps {
  assets: { [key: string]: JSX.Element };
}

function Home({ assets }: HomeProps) {
  return <div className={`${styles.home} zoomInFadeIn`}></div>;
}

export default Home;
