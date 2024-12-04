import React from "react";
import styles from "./Project-archive.module.css";

interface ArchiveProps {
  assets: { [key: string]: JSX.Element };
}

function Archive({ assets }: ArchiveProps) {
  return (
    <div className={styles.archive}>
      <div className={styles.title}>
        Collection <br />
        of
      </div>
      <div className={styles.titleFull}>Resources</div>
    </div>
  );
}

export default Archive;
