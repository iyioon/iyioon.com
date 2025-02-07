import React, { useEffect } from "react";
import styles from "./About.module.css";
import Footer from "../../components/footer/Footer";
import { useGlobal } from "../../utils/globalContext";

function About() {
  const { globals } = useGlobal();

  return (
    <div className={`${styles.about} zoomInFadeIn`}>
      <div className={styles.expSection}></div>
      <Footer assets={globals.assets} />
    </div>
  );
}
export default About;
