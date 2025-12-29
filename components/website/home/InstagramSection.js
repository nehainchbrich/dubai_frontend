"use client";
import React, { useRef, useEffect, useState } from "react";
import API_URLS from "@/config/apiconfig";
import styles from "../../../styles/VideoGrid.module.css";

const InstagramSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const videoRefs = useRef([]); // ✅ dynamic ref list
  const [isPlaying, setIsPlaying] = useState([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetch(`${API_URLS.INSTA}?is_active=1`);
        const data = await res.json();

        let result = [];
        if (data && Array.isArray(data)) {
          result = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          result = data.data;
        }

        console.log("Instagram Videos:", result);
        setVideos(result);
        setIsPlaying(new Array(result.length).fill(false));
      } catch (err) {
        console.error("Error fetching Instagram videos:", err);
      } finally {
        setLoading(false);
      }
    };
    getVideos();
  }, []);

  const togglePlayPause = (index) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (video.paused) {
      video.play().catch(err => console.error("Play failed:", err));
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const videoElements = videoRefs.current;

    // Cleanup helper
    const cleanupMap = new Map();

    videoElements.forEach((video, index) => {
      if (!video) return;

      const handlePlay = () => {
        videoElements.forEach((other, i) => {
          if (i !== index && other) {
            other.pause();
          }
        });
        setIsPlaying((prev) => {
          const newState = [...prev];
          // Ensure array is large enough
          if (newState.length <= index) {
            // Resize if needed (though init should cover it)
            return new Array(Math.max(newState.length, index + 1)).fill(false).map((val, i) => i === index);
          }
          return newState.map((_, i) => i === index);
        });
      };

      const handlePause = () =>
        setIsPlaying((prev) => prev.map((v, i) => (i === index ? false : v)));

      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);

      cleanupMap.set(video, { handlePlay, handlePause });
    });

    return () => {
      cleanupMap.forEach(({ handlePlay, handlePause }, video) => {
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
      });
    };
  }, [videos]);

  return (
    <section className={styles.videoGridSection}>
      <div className="container">
        <div className={styles.videoGrid}>
          {loading ? (
            <p className="text-center col-span-full">Loading videos...</p>
          ) : videos.length === 0 ? (
            <p className="text-center col-span-full">No videos available.</p>
          ) : (
            videos.map((item, index) => (
              <div key={item.id || index} className={styles.videoCol}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)} // ✅ dynamic ref
                  poster={item.thumbnail_url}
                  src={
                    item.video_url?.startsWith("http")
                      ? item.video_url
                      : `${process.env.API_URL}${item.video_url?.startsWith('/') ? '' : '/'}${item.video_url}`
                  }
                  playsInline
                  muted
                  onClick={() => togglePlayPause(index)}
                  onError={(e) => console.error("Video load error:", e.currentTarget.error, e.currentTarget.src)}
                />
                <button
                  className={styles.videoPlayPauseBtn}
                  onClick={() => togglePlayPause(index)} // ✅ pass index
                  aria-label="Play/Pause"
                >
                  {isPlaying[index] ? "⏸" : "▶"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
export default InstagramSection;