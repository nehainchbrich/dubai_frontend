import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Gallery.module.css";
import Image from "next/image";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import Link from "next/link";

const Gallery = ({ data, section, event }) => {
  const activeExpos = Array.isArray(event)
    ? event.filter((expo) => {
      const status = (expo.status || "").toUpperCase();
      return (
        status === "ACTIVE" ||
        (status === "UPCOMING" && Number(expo.default_status) === 1)
      );
    })
    : [];
  const description = ImagePath(section?.sectionSubHeading) ||
    "Browse stunning snapshots and exclusive property showcases from the Expo, capturing every memorable moment.";
  const img_gallery = data.filter((item) => item.fileType === "image" || item.fileType === "undefined");
  const slidesWrapperRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view on resize
  useEffect(() => {
    const calcItems = () => {
      // With the new 1 Big + 2 Small layout, we want to show 1 full block at a time
      // Maybe on huge screens we show 2? But 1 looks premium.
      if (window.innerWidth < 600) return 1;
      return 1;
    };
    setItemsPerView(calcItems());

    const handleResize = () => setItemsPerView(calcItems());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Show slide effect
  useEffect(() => {
    if (!slidesWrapperRef.current) return;
    const offset = currentIndex * (100 / itemsPerView);
    slidesWrapperRef.current.style.transform = `translateX(-${offset}%)`;

    const slideItems = slidesWrapperRef.current.querySelectorAll(
      `.${styles.gridSlide}`
    );
    slideItems.forEach((slide, i) =>
      slide.classList.toggle(styles.active, i === currentIndex)
    );
  }, [currentIndex, itemsPerView]);

  // Next / Prev
  const handleNext = () => {
    const slideItems =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.gridSlide}`) || [];
    const maxIndex = slideItems.length - itemsPerView;
    setCurrentIndex((prev) => (prev + 1) % (maxIndex + 1));
  };

  const handlePrev = () => {
    const slideItems =
      slidesWrapperRef.current?.querySelectorAll(`.${styles.gridSlide}`) || [];
    const maxIndex = slideItems.length - itemsPerView;
    setCurrentIndex((prev) => (prev - 1 + (maxIndex + 1)) % (maxIndex + 1));
  };

  // Auto slide on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      const rect = galleryRef.current.getBoundingClientRect();

      if (
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3
      ) {
        const slideItems =
          slidesWrapperRef.current?.querySelectorAll(`.${styles.gridSlide}`) || [];
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
    <section className={styles.gallerySection}>
      <div className={styles.container}>
        <div className={styles.dFlex}>
          <div>
            <h2 className={`${styles.textCenter} ${styles.galleryHeading}`}>
              {section?.sectionHeading || "Gallery of Expo Moments that Matter  "}
            </h2>
            <p className={styles.lead} dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>

          {activeExpos.length > 0 ? (
            <Link className={styles.btnClass} href="/expo-invitation">
              Grab FREE VIP Pass
            </Link>
          ) : (
            <Link
              className={`${styles.btn} ${styles.ghost}`}
              href="/contact-us"
            >
              Talk to Us
            </Link>
          )}
        </div>
      </div>
      <div className={styles.gallerySlider} id="gallery" ref={galleryRef}>
        <div className={styles.slides} ref={slidesWrapperRef}>
          {(() => {
            // Chunk images into groups of 3
            const chunks = [];
            for (let i = 0; i < img_gallery.length; i += 3) {
              chunks.push(img_gallery.slice(i, i + 3));
            }

            return chunks.map((chunk, i) => (
              <div key={i} className={styles.gridSlide}>
                {/* 1st Column: Big Image */}
                <div className={styles.bigColumn}>
                  {chunk[0] && (
                    <div className={styles.imageCardBig}>
                      <Image loader={imageKitLoader}
                        src={chunk[0].thumbnails} alt={chunk[0].title}
                        fill
                        className={styles.image}
                      />
                    </div>
                  )}
                </div>

                {/* 2nd Column: 2 Vertical Images */}
                <div className={styles.smallColumn}>
                  {chunk[1] && (
                    <div className={styles.imageCardSmall}>
                      <Image loader={imageKitLoader}
                        src={chunk[1].thumbnails} alt={chunk[1].title}
                        fill
                        className={styles.image}
                      />
                    </div>
                  )}
                  {chunk[2] && (
                    <div className={styles.imageCardSmall}>
                      <Image loader={imageKitLoader}
                        src={chunk[2].thumbnails} alt={chunk[2].title}
                        fill
                        className={styles.image}
                      />
                    </div>
                  )}
                </div>
              </div>
            ));
          })()}
        </div>

        {/* ✅ Hook up click handlers */}
        <div className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>
          ❮
        </div>
        <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>
          ❯
        </div>
      </div>
    </section>
  );
};

export default Gallery;
