"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/VideoGallery.module.css";
import { ImagePath } from "@/helper/Helper";
import Link from "next/link";

export default function VideoSection({ data, section, event }) {
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
      const status = (expo.status || "").toUpperCase();
      return (
        status === "ACTIVE" ||
        (status === "UPCOMING" && Number(expo.default_status) === 1)
      );
    })
    : [];

  const description =
    ImagePath(section?.sectionSubHeading) ||
    "Browse our video gallery and relive the energy, excitement, and elegance of our last Dubai Property Expo. ";

  const video_gallery = data.filter(
    (item) => item.fileType === "video" || item.fileType === "undefined"
  );

  const slidesWrapperRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Responsive items per view
  useEffect(() => {
    const calcItems = () => {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    };
    setItemsPerView(calcItems());
    const handleResize = () => setItemsPerView(calcItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slide effect
  useEffect(() => {
    if (!slidesWrapperRef.current) return;
    const offset = currentIndex * (100 / itemsPerView);
    slidesWrapperRef.current.style.transform = `translateX(-${offset}%)`;
  }, [currentIndex, itemsPerView]);

  // Next / Prev
  const handleNext = () => {
    const slideItems =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.slide}`) || [];
    const maxIndex = slideItems.length - itemsPerView;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const handlePrev = () => {
    const slideItems =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.slide}`) || [];
    const maxIndex = slideItems.length - itemsPerView;
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  // 🎬 play/pause handler
  const handlePlayPause = (e) => {
    const video = e.currentTarget.previousSibling;
    if (video.paused) {
      video.play();
      e.currentTarget.textContent = "⏸";
    } else {
      video.pause();
      e.currentTarget.textContent = "▶";
    }
  };

  // 🔥 Auto slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      const rect = galleryRef.current.getBoundingClientRect();

      if (
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3
      ) {
        const slideItems =
          slidesWrapperRef.current?.querySelectorAll(`.${styles.slide}`) || [];

        const scrollPercent =
          (window.innerHeight - rect.top) / (rect.height + window.innerHeight);

        const index = Math.min(
          slideItems.length - itemsPerView,
          Math.floor(scrollPercent * slideItems.length)
        );

        if (index !== currentIndex) {
          setCurrentIndex(index);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex, itemsPerView]);

  return (
    <div className={styles.videoSection}>
      <div className={styles.container}>
        <div className={styles.dFlex}>
          <div>
            <h2 className={styles.heading}>
              {section?.sectionHeading || "Watch Expo Exclusive Moments"}
            </h2>
            <p
              className={styles.lead}
              dangerouslySetInnerHTML={{ __html: description }}
            ></p>
          </div>

          {activeExpos.length > 0 ? (
            <Link className={styles.btnClass} href="/expo-invitation">
              Grab FREE VIP Pass
            </Link>
          ) : (
            <Link
              className={styles.btnClass}
              href="/contact-us"
            >
              Talk to Us
            </Link>
          )}
        </div>
      </div>

      <div className={styles.gallerySlider} ref={galleryRef}>
        <div className={styles.slides} ref={slidesWrapperRef}>
          {video_gallery &&
            video_gallery.map((item, i) => (
              <div key={i} className={styles.slide}>
                <div className={styles.videoCol}>
                  <video muted playsInline loop>
                    <source
                      src={`${process.env.API_URL}${item.thumbnails}`}
                      type="video/mp4"
                    />
                  </video>
                  <button
                    className={styles.videoPlayPauseBtn}
                    onClick={handlePlayPause}
                    aria-label="Play/Pause"
                  >
                    ▶
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* ✅ Arrows - Moved inside relative container if needed, or kept here */}
        <div className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>
          ❮
        </div>
        <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>
          ❯
        </div>
      </div>
    </div>
  );
}
