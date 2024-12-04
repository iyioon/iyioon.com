import React, { useEffect, useRef, useState } from "react";
import { getPreloadedAsset } from "../../utils/assetsUtils";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";

interface FooterProps {
  assets: { [key: string]: JSX.Element };
}

function Footer({ assets }: FooterProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) return;

    const footer = footerRef.current;
    if (!footer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = footer.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setMousePosition({ x, y });
    };

    footer.addEventListener("mousemove", handleMouseMove);
    return () => footer.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const warpStyle = {
    transform: `perspective(1000px) 
                rotateX(${mousePosition.y * 5}deg) 
                rotateY(${mousePosition.x * 5}deg)
                scale(1.05)`,
    transition: "transform var(--transition-duration) var(--transition-curve)",
  };

  return (
    <div className={styles.footer} ref={footerRef}>
      <div className={styles.footerBG} style={warpStyle}>
        {getPreloadedAsset(assets, "footerBG.jpg", {
          height: "100%",
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
          filter: "grayscale(100%)",
        })}
      </div>

      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <a href="/" className={styles.footerLink}>
            <LinkedInIcon fontSize="small" />
            LinkedIn
          </a>
          <a href="/" className={styles.footerLink}>
            <GitHubIcon fontSize="small" />
            GitHub
          </a>
          <a href="/" className={styles.footerLink}>
            <EmailIcon fontSize="small" />
            Email
          </a>
        </div>

        <div className={styles.menuLinks}>
          <a href="/" className={styles.menuLink}>
            Home
          </a>
          <Link to="/about" className={styles.menuLink} onClick={scrollToTop}>
            About
          </Link>
          <a href="/projects" className={styles.menuLink}>
            Projects
          </a>
          <a href="/contact" className={styles.menuLink}>
            Contact
          </a>
        </div>
      </div>
      <div className={styles.footerDivider} />
      <div className={styles.footerBottom}>
        <div className={styles.copyright}>
          © iyioon 2025 | All Rights Reserved
        </div>
        <div className={styles.footerTechStack}>Developed using React</div>
      </div>
    </div>
  );
}

const scrollToTop = () => {
  const content = document.querySelector(".content");
  if (content) {
    content.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export default Footer;
