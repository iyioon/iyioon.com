import React from "react";
import styles from "./Projects.module.css";
import IyioonBG from "../../components/iyioonBG/IyioonBG";

interface ProjectsProps {
  assets: { [key: string]: JSX.Element };
}

function Projects({ assets }: ProjectsProps) {
  return (
    <div className={`${styles.projects} zoomInFadeIn`}>
      <div className={styles.contents}>
        <IyioonBG />
      </div>
    </div>
  );
}

export default Projects;
