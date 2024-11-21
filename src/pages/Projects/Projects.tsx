import React from "react";
import styles from "./Projects.module.css";
import ImageSizeDiv from "../../components/imageSizeDiv/ImageSizeDiv";
import { getPreloadedAsset } from "../../utils/assetsUtils";

interface ProjectsProps {
  assets: { [key: string]: JSX.Element };
}

function Projects({ assets }: ProjectsProps) {
  return (
    <div className={`${styles.projects} zoomInFadeIn`}>
      <ProjectCard
        date="13 December 2024"
        episode="Episode.01"
        title="ARCHIVE"
        description="The Knowledge Base"
        assets={assets}
        bg="wave.mp4"
      />
    </div>
  );
}

export default Projects;

interface ProjectCardProps {
  date: string;
  episode: string;
  title: string;
  description: string;
  assets: { [key: string]: JSX.Element };
  bg: string;
}

function ProjectCard({
  date,
  episode,
  title,
  description,
  assets,
  bg,
}: ProjectCardProps) {
  return (
    <div className={styles.card}>
      <ImageSizeDiv>
        <div className={styles.cardContent}>
          <div className={styles.date}>{date}</div>
          <div className={styles.cardTitleBox}>
            <h3>{episode}</h3>
            <h1>{title}</h1>
          </div>
          <div className={styles.cardDescription}>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.cardBackground}>
          {getPreloadedAsset(
            assets,
            bg,
            {
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
            },
            {
              loop: true,
              muted: true,
              autoPlay: true,
              playsInline: true,
            },
            0
          )}
        </div>
      </ImageSizeDiv>
    </div>
  );
}
