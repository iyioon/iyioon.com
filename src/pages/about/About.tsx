import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import Footer from "../../components/footer/Footer";
import { useGlobal } from "../../utils/globalContext";
import { getPreloadedAsset } from "../../utils/assetsUtils";

const timeline = [
  {
    year: 2021,
    title: "North London Collegiate School Jeju",
    description: "Aug 2013 - May 2021\nIB Diploma 44/45",
    imgLink: "2021.jpg",
  },
  {
    year: 2022,
    title: "National University of Singapore",
    description: "Expected May 2026\nBachelor of Computing in Computer Science",
    imgLink: "2022.jpg",
  },
  {
    year: 2023,
    title: "MedySapiens",
    description:
      "Internship: May - June 2023\nRedesign of the MedySapiens website using Next.js",
    imgLink: "2023.jpg",
  },
  {
    year: 2024,
    title: "NUS INFORMATION TECHNOLOGY",
    description:
      "Internship: May 2025 - Current\nCyber Security eLearning module development using React",
    imgLink: "2024.jpg",
  },
];

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

  const [expBGlink, setExpBGlink] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

  const handleMouseEnter = (year: string) => {
    setExpBGlink(
      `${timeline.find((event) => event.year === parseInt(year))?.imgLink}`
    );
    setHoveredYear(parseInt(year));
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setHoveredYear(null);
    setIsHovered(false);
  };

  const handleTouchStart = (year: string) => {
    handleMouseEnter(year);
  };

  const handleTouchEnd = () => {
    // Add a small delay to allow the user to see the effect
    setTimeout(() => {
      handleMouseLeave();
    }, 100);
  };

  return (
    <div className={`${styles.about} zoomInFadeIn`}>
      <div className={styles.expSection}>
        <div className={styles.paper}>
          {getPreloadedAsset(globals.assets, "paperblack.jpg", {
            width: "100%",
            height: "100%",
            objectFit: "fill",
            objectPosition: "center",
            filter: "grayscale(100%)",
          })}
          <div className={styles.paperOverlay} />
        </div>
        <div className={styles.dates}>
          {timeline.map((event) => (
            <div
              key={event.year}
              className={`${styles.date} clickable 
              ${
                hoveredYear
                  ? event.year === hoveredYear
                    ? styles.dateHovered
                    : styles.dateHidden
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnter(event.year.toString())}
              onMouseLeave={handleMouseLeave}
              onTouchStart={() => handleTouchStart(event.year.toString())}
              onTouchEnd={handleTouchEnd}
              style={{ touchAction: "none" }} // Prevent scrolling while touching
            >
              {event.year}
            </div>
          ))}
        </div>
        <div
          className={`${styles.expBG} ${
            isHovered ? styles.visible : styles.hidden
          }`}
        >
          <div className={styles.expBGContent} key={expBGlink}>
            {getPreloadedAsset(globals.assets, expBGlink, {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            })}
          </div>
        </div>
      </div>
      <Footer assets={globals.assets} />
    </div>
  );
}
export default About;
