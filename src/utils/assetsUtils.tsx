import React from "react";

/* -------------------------------------------------------------------------------- */
// This file holds utility functions to handle assets loaded from PreloadAssets.tsx.
// Use getPreloadedAsset to get an asset from the assets object.
/* -------------------------------------------------------------------------------- */

export const getPreloadedAsset = (
  // The assets object from PreloadAssets.tsx.
  assets: { [key: string]: JSX.Element },
  // The link to the asset in the assets object.
  link: string,
  // Optional style to apply to the asset.
  style?: React.CSSProperties,
  // Additional props
  additionalProps?: React.VideoHTMLAttributes<HTMLVideoElement>,
  // Optional volume to set for the audio/video asset.
  volume?: number
) => {
  const asset = assets[link];
  if (!asset) {
    return (
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(255, 0, 0, 0.6)",
        }}
      >
        asset not found
      </div>
    );
  }

  // Video assets need to be handled differently to set the volume.
  if (asset.type === "video") {
    const commonProps = {
      style: { ...asset.props.style, ...style },
      ...additionalProps,
    };

    const ref = React.createRef<HTMLVideoElement>();

    // Attach a ref to the video element and set the volume when the ref is set
    const onLoadedMetadata = () => {
      if (ref.current && volume !== undefined) {
        ref.current.volume = volume;
      }
    };

    return React.cloneElement(asset, {
      ...commonProps,
      ref,
      onLoadedMetadata,
    });
  }

  // Image assets can be returned as is.
  return React.cloneElement(asset, {
    style: { ...asset.props.style, ...style },
    ...additionalProps,
  });
};

/* -------------------------------------------------------------------------------- */
// Play preloaded audio.
/* -------------------------------------------------------------------------------- */

// Track if audio is playing and the current audio element
let playingAudioElements: HTMLAudioElement[] = [];

export const playPreloadedAudio = async (
  assets: { [key: string]: JSX.Element },
  link: string,
  volume: number = 0.5,
  loop: boolean = false,
  fadeDuration: number = 1000, // Fade duration in milliseconds
  stopPrev: boolean = true
) => {
  // Stop audio if no link is provided
  if (!link) {
    // Fade out all playing audios and wait for them to complete
    const fadeOutPromises = playingAudioElements.map((audioElement) =>
      fadeOutAudio(audioElement, fadeDuration).then(() => {
        const index = playingAudioElements.indexOf(audioElement);
        if (index > -1) {
          playingAudioElements.splice(index, 1);
        }
      })
    );
    await Promise.all(fadeOutPromises);
    return;
  }

  const asset = assets[link];
  if (!asset || asset.type !== "audio") {
    console.error("Audio asset not found or is not an audio element");
    return;
  }

  const audioSrc = asset.props.src;

  if (stopPrev) {
    // Fade out all current audios and wait for them to complete
    const fadeOutPromises = playingAudioElements.map((audioElement) =>
      fadeOutAudio(audioElement, fadeDuration).then(() => {
        const index = playingAudioElements.indexOf(audioElement);
        if (index > -1) {
          playingAudioElements.splice(index, 1);
        }
      })
    );
    await Promise.all(fadeOutPromises);
  }

  // Set up new audio element
  const newAudioElement = new Audio(audioSrc);
  newAudioElement.loop = loop;
  newAudioElement.volume = 0; // Start at volume 0 for fade-in

  newAudioElement.addEventListener("ended", () => {
    const index = playingAudioElements.indexOf(newAudioElement);
    if (index > -1) {
      playingAudioElements.splice(index, 1);
    }
  });

  // Start playing with fade-in effect
  try {
    await newAudioElement.play();
    playingAudioElements.push(newAudioElement);
    fadeInAudio(newAudioElement, volume, fadeDuration);
  } catch (error) {
    console.error("Error playing audio:", error);
  }
};

function fadeOutAudio(
  audioElement: HTMLAudioElement,
  duration: number
): Promise<void> {
  return new Promise((resolve) => {
    const initialVolume = audioElement.volume;
    const stepTime = 50; // Time between volume changes in milliseconds
    const steps = duration / stepTime;
    const volumeStep = initialVolume / steps;
    let previousVolume = audioElement.volume;

    const fadeOutInterval = setInterval(() => {
      // Attempt to reduce the volume
      const newVolume = Math.max(0, audioElement.volume - volumeStep);
      audioElement.volume = newVolume;

      // Check if volume is actually changing
      if (audioElement.volume === previousVolume) {
        // Volume isn't changing; likely due to platform restrictions
        // Stop adjusting volume and pause immediately
        clearInterval(fadeOutInterval);
        audioElement.pause();
        audioElement.currentTime = 0;
        resolve();
      } else {
        previousVolume = audioElement.volume;

        if (newVolume <= 0) {
          clearInterval(fadeOutInterval);
          audioElement.pause();
          audioElement.currentTime = 0;
          resolve();
        }
      }
    }, stepTime);
  });
}

function fadeInAudio(
  audioElement: HTMLAudioElement,
  targetVolume: number,
  duration: number
) {
  const stepTime = 50; // Time between volume changes in milliseconds
  const steps = duration / stepTime;
  const volumeStep = targetVolume / steps;

  audioElement.volume = 0;
  audioElement.play();

  const fadeInInterval = setInterval(() => {
    const newVolume = Math.min(targetVolume, audioElement.volume + volumeStep);
    audioElement.volume = newVolume;

    if (newVolume >= targetVolume) {
      clearInterval(fadeInInterval);
    }
  }, stepTime);
}

/* -------------------------------------------------------------------------------- */
// Testing assets.
// Use this function to display all assets in a grid.
/* -------------------------------------------------------------------------------- */

export const ShowAllAssets: React.FC<{
  assets: { [key: string]: JSX.Element };
}> = ({ assets }) => {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
        justifyContent: "center",
        padding: "20px",
        overflow: "auto",
      }}
    >
      {Object.keys(assets).map((key) => (
        <div key={key} style={{ textAlign: "center" }}>
          {" "}
          {/* Ensure each container has a unique key and center the text */}
          {React.cloneElement(assets[key], {
            style: { width: "300px", height: "300px" },
          })}
          <div>{key}</div> {/* Display the key as text below the asset */}
        </div>
      ))}
    </div>
  );
};
