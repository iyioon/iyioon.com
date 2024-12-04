import React, { useEffect, useRef, useState } from "react";
import styles from "./About.module.css";
import Footer from "../../components/footer/Footer";

interface AboutProps {
  assets: { [key: string]: JSX.Element };
}

function About({ assets }: AboutProps) {
  return (
    <div className={`${styles.about} zoomInFadeIn`}>
      <div className={styles.expSection}>
        <div className={styles.expContent}>
          <h2>Experiences</h2>
          <div className={styles.expItem}>
            <h5>NUS IT - Intern</h5>
            <p className={styles.expItemDate}>May 2024 - Present</p>
            <p className={styles.expItemDesc}>
              Developed a web game for the new IT Security E Learning module.
            </p>
          </div>

          <div className={styles.expItem}>
            <h5>MedySapiens - Intern</h5>
            <p className={styles.expItemDate}>July 2023</p>
            <p className={styles.expItemDesc}>
              Developed a homepage for the company's new website.
            </p>
          </div>

          <br />

          <h2>Qualifications</h2>
          <div className={styles.expItem}>
            <h5>National University of Singapore</h5>
            <p className={styles.expItemDate}>2022 - Present</p>
            <p className={styles.expItemDesc}>
              Bachelor of Computing in Computer Science (with Honours*)
            </p>
          </div>
          <div className={styles.expItem}>
            <h5>North London Collegiate School Jeju</h5>
            <p className={styles.expItemDate}>2013 - 2021</p>
            <p className={styles.expItemDesc}>
              International Baccalaureate® (IB) Diploma <br />
              HL - Computer Science, Math Analysis, Physics <br />
              SL - English A Lang and Lit, Spanish AB, Economics
            </p>
          </div>
        </div>
      </div>
      <Footer assets={assets} />
    </div>
  );
}

export default About;
