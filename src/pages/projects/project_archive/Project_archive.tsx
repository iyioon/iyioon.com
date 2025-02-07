import React from "react";
import styles from "./Project-archive.module.css";
import { getPreloadedAsset } from "../../../utils/assetsUtils";
import { useGlobal } from "../../../utils/globalContext";

function Archive() {
  const { globals } = useGlobal();
  return (
    <>
      <div className={`${styles.archive} zoomInFadeIn`}>
        <div className={styles.bg}>
          {getPreloadedAsset(globals.assets, "archiveBG.jpg", {
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          })}
          <div className={styles.bgOverlay} />
        </div>
        <div className={styles.title}>
          <h1>ARCHIVE</h1>
          <p>
            Knowledge base <br />
            tailored to capture, organize and access notes.
          </p>
        </div>
      </div>
    </>
  );
}

export default Archive;
