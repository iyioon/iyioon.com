import React from "react";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.home}>
      <div className={`${styles.thumbnail}`} />
    </div>
  );
}

export default Home;
