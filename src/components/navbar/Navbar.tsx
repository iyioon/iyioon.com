import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const navitem = [
  {
    name: "Projects",
    link: "/projects",
    subnav: [
      {
        name: "Archive",
        link: "/project/archive",
      },
      {
        name: "Design",
        link: "/project/aesign",
      },
      {
        name: "Desktop",
        link: "/project/aesktop",
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
  const [activeParentLink, setActiveParentLink] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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
    // Dont do for mobile menu
    if (menuOpen) return;

    // Dont do anything if the current item does not have subnav
    const item = navitem.find((item) => item.name === itemName);
    if (!item?.subnav) return;

    // Else, set the hovered item and expand the navbar
    setHoveredItem(itemName);

    // Set navbar to full height
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
    // Dont do for mobile menu
    if (menuOpen) return;

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

  const handleLinkClick = () => {
    // Reset the navbar to its original state
    setActiveParentLink(null);

    // For mobile menu
    setMenuOpen(false);

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

  // For mobile menu Click
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    const navbar = document.querySelector(`.${styles.navbar}`);
    navbar?.classList.toggle(styles.navbarExpanded);
    document.querySelector(".content")?.classList.toggle("content-zoomed");
    document
      .querySelector(`.${styles.bottom}`)
      ?.classList.toggle(styles.bottomExpanded);
  };

  // Check if the parent link is active
  // If the parent link is active, set the active parent link
  // This is used to keep the parent link active when the user is on a subnav link
  const handleSubLinkClick = (link: string) => {
    const parentLink = navitem.find((item) =>
      item.subnav?.find((subItem) => subItem.link === link)
    )?.link;

    if (parentLink) {
      setActiveParentLink(parentLink);
    }

    // Reset the navbar to its original state
    handleMouseLeave();
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.top}>
        <div className={`${styles.logo} hoverGlowText`}>
          <Link to="/" className={styles.logoLink} onClick={handleLinkClick}>
            iyioon
          </Link>
        </div>
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
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.navLinkActive : ""}
                ${
                  // If one of the child links is active,
                  // keep the parent link active but with a different style
                  item.link === activeParentLink
                    ? styles.navLinkParentActive
                    : ""
                }
                `
                }
                onClick={handleLinkClick}
              >
                {item.name}
              </NavLink>
            </div>
          ))}
        </div>
        <div className={styles.menuButton} onClick={toggleMenu}>
          {menuOpen ? (
            <CloseIcon fontSize="inherit" />
          ) : (
            <MenuIcon fontSize="inherit" />
          )}
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
                <div
                  // Force re-render when the hovered item changes by
                  // adding the hovered item to the key.
                  // key={`${index}-${hoveredItem}`}
                  key={index}
                  className={styles.subnavItem}
                >
                  <NavLink
                    to={subItem.link}
                    onClick={() => handleSubLinkClick(subItem.link)}
                    className={({ isActive }) =>
                      `${styles.subnavLink} ${
                        isActive ? styles.subnavLinkActive : ""
                      }`
                    }
                  >
                    {subItem.name}
                  </NavLink>
                </div>
              ))}
        </div>

        {/* For mobile menu */}
        {menuOpen && (
          <div className={styles.navlistMobile}>
            <div className={styles.navitemMobile}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLinkMobile} ${
                    isActive ? styles.navLinkActiveMobile : ""
                  }`
                }
                onClick={handleLinkClick}
              >
                Home
              </NavLink>
            </div>
            {navitem.map((item, index) => (
              <div key={index} className={styles.navitemMobile}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `${styles.navLinkMobile} ${
                      isActive ? styles.navLinkActiveMobile : ""
                    }`
                  }
                  onClick={toggleMenu}
                >
                  {item.name}
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
