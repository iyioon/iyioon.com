import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";

const navitem = [
  {
    name: "Project",
    link: "/project",
    subnav: [
      {
        name: "Archive",
        link: "/project/web",
      },
      {
        name: "Design",
        link: "/project/mobile",
      },
      {
        name: "Desktop",
        link: "/project/desktop",
      },
    ],
  },
  {
    name: "Research",
    link: "/research",
    subnav: [
      {
        name: "Artificial Intelligence",
        link: "/research/ai",
      },
      {
        name: "Machine Learning",
        link: "/research/ml",
      },
      {
        name: "Deep Learning",
        link: "/research/dl",
      },
    ],
  },
  {
    name: "About",
    link: "/about",
  },
];

function Navbar() {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // If the content is scrolled, change the navbar style
  // and remove top margin from the content
  // Check app.css for the styles for content
  useEffect(() => {
    const handleScroll = () => {
      const content = document.querySelector(".content");
      const navbar = document.querySelector(`.${styles.navbar}`);

      if (content && navbar) {
        if (content.scrollTop > 0) {
          navbar.classList.add(styles.navbarScrolled);
          content.classList.add("contentScrolled");
        } else {
          navbar.classList.remove(styles.navbarScrolled);
          content.classList.remove("contentScrolled");
        }
      }
    };

    const content = document.querySelector(".content");
    content?.addEventListener("scroll", handleScroll);

    return () => content?.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (itemName: string) => {
    // Dont do anything if the current item does not have subnav
    const item = navitem.find((item) => item.name === itemName);
    if (!item?.subnav) return;

    // Else, set the hovered item and expand the navbar
    setHoveredItem(itemName);

    // Set navbar to full width
    document
      .querySelector(`.${styles.navbar}`)
      ?.classList.add(styles.navbarExpanded);

    // Zoom out the website content
    document.querySelector(".content")?.classList.add("content-zoomed");

    // Expand the bottom of the navbar for the subnav
    document
      .querySelector(`.${styles.bottom}`)
      ?.classList.add(styles.bottomExpanded);
  };

  const handleMouseLeave = () => {
    // Reset the navbar to its original state
    setHoveredItem(null);
    document
      .querySelector(`.${styles.navbar}`)
      ?.classList.remove(styles.navbarExpanded);
    document.querySelector(".content")?.classList.remove("content-zoomed");
    document
      .querySelector(`.${styles.bottom}`)
      ?.classList.remove(styles.bottomExpanded);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={`${styles.logo} hoverGlowText`}>iyioon</div>
        <div className={styles.navlist}>
          {navitem.map((item, index) => (
            <div
              key={index}
              className={`${styles.navitem} ${
                hoveredItem === item.name ? styles.navitemHovered : ""
              }`}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {item.name}
            </div>
          ))}
        </div>
        <div className={styles.rightspacing}>iyioon</div>
      </div>

      {/* For subnav */}
      <div
        className={styles.bottom}
        onMouseEnter={() => handleMouseEnter(hoveredItem || "")}
        onMouseLeave={handleMouseLeave}
      >
        <div className={styles.subnavList}>
          {hoveredItem &&
            navitem
              .find((item) => item.name === hoveredItem)
              ?.subnav?.map((subItem, index) => (
                <div key={index} className={styles.subnavItem}>
                  {subItem.name}
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
