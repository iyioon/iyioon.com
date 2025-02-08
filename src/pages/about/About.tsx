import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import Footer from "../../components/footer/Footer";
import { useGlobal } from "../../utils/globalContext";
import { getPreloadedAsset } from "../../utils/assetsUtils";

const timeline = [
  {
    year: 2021,
    title: "Title 1",
    description: "Description 1",
    imgLink: "2021.jpg",
  },
  {
    year: 2022,
    title: "Title 2",
    description: "Description 2",
    imgLink: "2022.jpg",
  },
  {
    year: 2023,
    title: "Title 3",
    description: "Description 3",
    imgLink: "2023.jpg",
  },
  {
    year: 2024,
    title: "Title 4",
    description: "Description 4",
    imgLink: "2024.jpg",
  },
  {
    year: 2025,
    title: "Title 5",
    description: "Description 5",
    imgLink: "2025.jpg",
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
