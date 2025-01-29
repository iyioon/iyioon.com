import React from "react";
import styles from "./Project-archive.module.css";

interface ArchiveProps {
  assets: { [key: string]: JSX.Element };
}

function Archive({ assets }: ArchiveProps) {
  return (
    <div className={styles.archive}>
      <div className={styles.title}>
        DEVELOPMENT <br />
        IN
      </div>
      <div className={styles.titleFull}>PROGRESS</div>
    </div>
  );
}

export default Archive;
