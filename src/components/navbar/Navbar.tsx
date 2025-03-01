import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface SubNavItem {
  name: string;
  link: string;
}

interface NavItem {
  name: string;
  link: string;
  subnav?: SubNavItem[];
}

interface NavbarProps {
  navitems: NavItem[];
  colorScheme?: "light" | "dark";
}

/**
 * Navigation bar component that supports both desktop and mobile views
 * with dropdown subnavigation capabilities.
 *
 * @param {NavbarProps} props - The props for the Navbar component
 * @param {NavItem[]} props.navitems - Array of navigation items to display
 * @param {"light" | "dark"} [props.colorScheme="light"] - Color scheme for the navbar
 *
 * @example
 * const items = [
 *   {
 *     name: "Products",
 *     link: "/products",
 *     subnav: [
 *       { name: "Featured", link: "/products/featured" },
 *       { name: "New", link: "/products/new" }
 *     ]
 *   }
 * ];
 *
 * <Navbar navitems={items} colorScheme="dark" />
 */
function Navbar({ navitems, colorScheme = "light" }: NavbarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [activeParentName, setActiveParentName] = useState<string | null>(null);
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
    const item = navitems.find((item) => item.name === itemName);
    if (!item?.subnav) return;

    // Else, set the hovered item and expand the navbar
    setHoveredItem(itemName);

    // Set navbar to full height
    document
      .querySelector(`.${styles.navbar}`)
      ?.classList.add(styles.navbarExpanded);

    // Apply different style to navbar overlay
    document
      .querySelector(`.${styles.navbarOverlay}`)
      ?.classList.add(styles.navbarOverlayActive);

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
    document
      .querySelector(`.${styles.navbarOverlay}`)
      ?.classList.remove(styles.navbarOverlayActive);
    document.querySelector(".content")?.classList.remove("content-zoomed");
    document
      .querySelector(`.${styles.bottom}`)
      ?.classList.remove(styles.bottomExpanded);
  };

  const handleLinkClick = () => {
    // Reset the navbar to its original state
    setActiveParentName(null);

    // For mobile menu
    setMenuOpen(false);

    // Reset the navbar to its original state
    setHoveredItem(null);
    document
      .querySelector(`.${styles.navbar}`)
      ?.classList.remove(styles.navbarExpanded);
    document
      .querySelector(`.${styles.navbarOverlay}`)
      ?.classList.remove(styles.navbarOverlayActive);
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
    document
      .querySelector(`.${styles.navbarOverlay}`)
      ?.classList.toggle(styles.navbarOverlayActive);
    document.querySelector(".content")?.classList.toggle("content-zoomed");
    document
      .querySelector(`.${styles.bottom}`)
      ?.classList.toggle(styles.bottomExpanded);
  };

  // Check if the parent link is active
  // If the parent link is active, set the active parent link
  // This is used to keep the parent link active when the user is on a subnav link
  const handleSubLinkClick = (link: string) => {
    const parentName = navitems.find((item) =>
      item.subnav?.find((subItem) => subItem.link === link)
    )?.name;

    if (parentName) {
      setActiveParentName(parentName);
    }

    // Reset the navbar to its original state
    handleMouseLeave();
  };

  return (
    <div className={`${styles.navbar} ${styles[colorScheme]}`}>
      <div className={styles.navbarOverlay} />
      <div className={styles.top}>
        <div className={`${styles.logo}`}>
          <Link to="/" className={styles.logoLink} onClick={handleLinkClick}>
            iyioon
          </Link>
        </div>
        <div className={styles.navlist}>
          {navitems.map((item, index) => (
            <div
              key={index}
              className={`${styles.navitem} ${
                hoveredItem === item.name ? styles.navitemHovered : ""
              }`}
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {
                // If the item has a link ie not ""
                item.link ? (
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      `${styles.navLink} ${isActive ? styles.navLinkActive : ""}
                  ${
                    // If one of the child links is active,
                    // keep the parent link active but with a different style
                    item.name === activeParentName
                      ? styles.navLinkParentActive
                      : ""
                  }
                  `
                    }
                    onClick={handleLinkClick}
                  >
                    {item.name}
                  </NavLink>
                ) : (
                  <div
                    className={`${styles.navLink} 
                  ${
                    // If one of the child links is active,
                    // keep the parent link active but with a different style
                    item.name === activeParentName
                      ? styles.navLinkParentActive
                      : ""
                  }
                  `}
                  >
                    {item.name}
                  </div>
                )
              }
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
            navitems
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
            {navitems.map(
              (item, index) =>
                item.link && (
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
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
