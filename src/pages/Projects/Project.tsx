import React from "react";
import styles from "./Project.module.css";
import IyioonBG from "../../components/iyioonBG/IyioonBG";

interface ProjectProps {
  assets: { [key: string]: JSX.Element };
}

function Project({ assets }: ProjectProps) {
  return (
    <div className={`${styles.project} zoomInFadeIn`}>
      <div className={styles.contents}>
        <IyioonBG />
      </div>
    </div>
  );
}

export default Project;
