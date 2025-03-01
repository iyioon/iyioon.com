import React, { useEffect } from "react";
import styles from "./Home.module.css";
import { useGlobal } from "../../utils/globalContext";
import { getPreloadedAsset } from "../../utils/assetsUtils";

function Home() {
  const { globals, register } = useGlobal();

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  const list = [
    {
      title: "Some Title",
      description: "03-01",
      link: "/projects",
    },
    {
      title: "Some Title",
      description: "03-02",
      link: "/research",
    },
    {
      title: "Some Title",
      description: "03-03",
      link: "/about",
    },
    {
      title: "Some Title",
      description: "03-01",
      link: "/projects",
    },
    {
      title: "Some Title",
      description: "03-02",
      link: "/research",
    },
    {
      title: "Some Title",
      description: "03-03",
      link: "/about",
    },
  ];

  return (
    <div className={`${styles.home} zoomInFadeIn`}>
      <div className={styles.paper}>
        {/* {getPreloadedAsset(globals.assets, "paper.jpg", {
          width: "100%",
          height: "100%",
          objectFit: "fill",
          objectPosition: "center",
          filter: "grayscale(100%)",
        })} */}
        <div className={styles.paperOverlay} />
      </div>

      <div className={styles.titleHolder}>
        <div className={styles.title}>
          {getPreloadedAsset(globals.assets, "signature.svg", {
            width: "100%",
            height: "100%",
            border: "1px solid red",
            transform: "scale(1.5)",
          })}
        </div>
        <div className={styles.subtitle}>Under Development</div>
      </div>

      {/* <div className={styles.menu}>
        <div className={styles.menuCol}>
          {list.map((item, index) => (
            <p key={index}> {item.title}</p>
          ))}
        </div>

        <div className={styles.menuCol}>
          {list.map((item, index) => (
            <p className={styles.menuDesc} key={index}>
              {" "}
              {item.description}
            </p>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Home;
