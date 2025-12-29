import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Gallery.module.css";
import Image from "next/image";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import Link from "next/link";

const Gallery = ({data,section,event}) => {
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
  const img_gallery = data.filter((item)=>item.fileType==="image" || item.fileType==="undefined");
  const slidesWrapperRef = useRef(null);
  const galleryRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);

  // Update items per view on resize
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

  // Show slide effect
  useEffect(() => {
    if (!slidesWrapperRef.current) return;
    const offset = currentIndex * (100 / itemsPerView);
    slidesWrapperRef.current.style.transform = `translateX(-${offset}%)`;

    const slideItems = slidesWrapperRef.current.querySelectorAll(
      `.${styles.slide}`
    );
    slideItems.forEach((slide, i) =>
      slide.classList.toggle(styles.active, i === currentIndex)
    );
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
    <>
      <div className={styles.container}>
        <div className={styles.dFlex}>
        <div>
      <h2 className={`${styles.textCenter} ${styles.galleryHeading}`}>
        {section?.sectionHeading || "Gallery of Expo Moments that Matter  "}
      </h2>
      <p className={styles.lead} dangerouslySetInnerHTML={{__html:description}}></p>
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
      <section className={styles.gallerySlider} id="gallery" ref={galleryRef}>
        <div className={styles.slides} ref={slidesWrapperRef}>
          {img_gallery && img_gallery.map((item,i)=>(
  <div key={i} className={styles.slide}>
                <div className={styles.imageWrapper}>
                  <Image loader={imageKitLoader}
                    src={item.thumbnails} alt={item.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
                
              </div>
          ))}

        </div>

        {/* ✅ Hook up click handlers */}
        <div className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>
          ❮
        </div>
        <div className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>
          ❯
        </div>
      </section>
    </>
  );
};

export default Gallery;
