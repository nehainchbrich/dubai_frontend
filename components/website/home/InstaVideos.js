"use client";
import { useRef, useState, useEffect } from "react";
import styles from "../../../styles/VideoGrid.module.css";

const VideoGrid = () => {
  const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [isPlaying, setIsPlaying] = useState([false, false, false, false]);

  const togglePlayPause = (index) => {
    const video = videoRefs[index].current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      const video = ref.current;
      if (!video) return;

      const handlePlay = () => {
        // Pause all other videos
        videoRefs.forEach((otherRef, otherIndex) => {
          if (otherIndex !== index && otherRef.current) {
            otherRef.current.pause();
          }
        });

        // Update state
        setIsPlaying((prev) => {
          const updated = Array(videoRefs.length).fill(false);
          updated[index] = true;
          return updated;
        });
      };

      const handlePause = () =>
        setIsPlaying((prev) => {
          const updated = [...prev];
          updated[index] = false;
          return updated;
        });

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      return () => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      };
    });
  }, []);

  return (
    <section className={styles.videoGridSection}>
      <div className="container">
        <div className={styles.videoGrid}>
          {["IMG_7304.MP4", "IMG_7305.MP4", "IMG_7306.MP4", "IMG_7307.MP4"].map(
            (src, index) => (
              <div
                className={`${styles.videoCol} ${
                  isPlaying[index] ? styles.playing : ""
                }`}
                key={index}
              >
                <video ref={videoRefs[index]} muted playsInline>
                  <source src={`/images/video/${src}`} type="video/mp4" />
                </video>

                <button
                  className={styles.videoPlayPauseBtn}
                  onClick={() => togglePlayPause(index)}
                  aria-label="Play/Pause"
                >
                  {isPlaying[index] ? "⏸" : "▶"}
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoGrid;
