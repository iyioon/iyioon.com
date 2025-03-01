import React, { useEffect, useRef } from "react";
import styles from "./Project-archive.module.css";
import { getPreloadedAsset } from "../../../utils/assetsUtils";
import { useGlobal } from "../../../utils/globalContext";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

function Archive() {
  const { globals } = useGlobal();

  useEffect(() => {
    // Get the current navbar color scheme
    const navbarColor = globals.assets?.navbarColor;
    // Change to dark
    globals.setNavbarColor("dark");
    // Change to light upon unmount
    return () => {
      globals.setNavbarColor(navbarColor);
    };
  }, []);

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

        <div className={styles.content}>
          <iframe
            src="https://arc.iyioon.com/graph/"
            className={styles.embeddedSite}
            title="Embedded Content"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            loading="lazy"
          />
        </div>
        <div className={styles.title}>
          <h1>ARCHIVE </h1>
          <p>
            Knowledge base <br />
            tailored to capture, organize and access notes.
          </p>
          <a href="https://arc.iyioon.com" target="_blank" rel="noreferrer">
            VISIT <ChevronRightIcon />
          </a>
        </div>
      </div>
    </>
  );
}

export default Archive;
