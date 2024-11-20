import React from "react";
import styles from "./Projects.module.css";
import ImageSizeDiv from "../../components/imageSizeDiv/ImageSizeDiv";

function Projects() {
  return (
    <div className={styles.projects}>
      <ProjectCard
        date="13 December 2024"
        episode="Episode.03"
        title="ARCHIVE"
        description="The Knowledge Base"
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
}

function ProjectCard({ date, episode, title, description }: ProjectCardProps) {
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
        <div className={styles.cardBackground} />
      </ImageSizeDiv>
    </div>
  );
}
