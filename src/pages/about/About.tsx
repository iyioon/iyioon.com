import React from "react";
import styles from "./About.module.css";
import ImageSizeDiv from "../../components/imageSizeDiv/ImageSizeDiv";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface AboutProps {
  assets: { [key: string]: JSX.Element };
}

function About({ assets }: AboutProps) {
  return <div className={`${styles.about} zoomInFadeIn`}></div>;
}

export default About;
