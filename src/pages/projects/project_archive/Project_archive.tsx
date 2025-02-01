import React from "react";
import styles from "./Project-archive.module.css";
import { getPreloadedAsset } from "../../../utils/assetsUtils";

interface ArchiveProps {
  assets: { [key: string]: JSX.Element };
}

function Archive({ assets }: ArchiveProps) {
  return (
    <>
      <div className={`${styles.archive} zoomInFadeIn`}>
        <div className={styles.bg}>
          {getPreloadedAsset(assets, "archiveBG.jpg", {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          })}
          <div className={styles.bgOverlay} />
        </div>
        <div className={styles.title}>
          KNOWLEDGE BASE <br />
          TAILORED TO <br />
          CAPTURE, ORGANIZE, AND ACCESS NOTES
        </div>
      </div>
    </>
  );
}

export default Archive;
