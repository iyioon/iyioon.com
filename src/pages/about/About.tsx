import React, { useEffect } from "react";
import styles from "./About.module.css";
import Footer from "../../components/footer/Footer";
import { useGlobal } from "../../utils/globalContext";

function About() {
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
    <div className={`${styles.about} zoomInFadeIn`}>
      <div className={styles.expSection}></div>
      <Footer assets={globals.assets} />
    </div>
  );
}
export default About;
