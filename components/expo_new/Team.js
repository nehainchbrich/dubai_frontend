import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Team.module.css";
import Image from "next/image";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import Link from "next/link";

const Team = ({ data, section, event }) => {
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
    "Meet the Great Minds Who Drive Inch & Brick Realty forward. ";
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const autoId = useRef(null);

  const [isHovered, setIsHovered] = useState(false); // ✅ Track hover state

  // ✅ adjust slides based on screen width
  useEffect(() => {
    const updateSlides = () => {
      const show = window.innerWidth <= 768 ? 1 : 3;
      setSlidesToShow(show);
      setIndex(show === 3 ? 1 : 0); // 👈 center on load if 3 slides
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  // ✅ slide transform
  useEffect(() => {
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (!cards.length) return;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(trackRef.current).gap) || 0;
    const slideWidth = cardWidth + gap;

    const x = -index * slideWidth;
    trackRef.current.style.transform = `translateX(${x}px)`;
    trackRef.current.style.transition = "transform 0.5s ease-in-out";
  }, [index, slidesToShow]);

  const next = () => {
    const maxIndex = data.length - slidesToShow;
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    const maxIndex = data.length - slidesToShow;
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // ✅ autoplay with pause on hover
  useEffect(() => {
    if (!isHovered) {
      autoId.current = setInterval(next, 3000);
    }
    return () => clearInterval(autoId.current);
  }, [slidesToShow, isHovered]);

  return (
    <section className={styles.teamSection}>
      <h2>{section?.sectionHeading || "Our People"}</h2>
      <p className={styles.lead} dangerouslySetInnerHTML={{ __html: description }}></p>
      <span className={styles.bgWatermark}>team</span>

      <div
        className={styles.sliderWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className={`${styles.cards} ${styles.teamSliderTrack}`}
          ref={trackRef}
        >
          {data &&
            data.map((item, i) => {
              // ✅ highlight center card
              let activeIndex = slidesToShow === 3 ? index + 1 : index;
              const isActive = i === activeIndex;

              return (
                <div
                  key={i}
                  className={`${styles.teamCard} ${isActive ? styles.active : ""}`}
                >
                  <div className={styles.card}>
                    <Image
                      src={item.profile}
                      loader={imageKitLoader}
                      alt={item.firstName}
                      width={400}
                      height={500}
                      className={styles.profImg}
                    />
                    <div className={styles.cardContent}>
                      <h3>{item.firstName}</h3>
                      <p>{item.designation}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <button onClick={prev} className={`${styles.prev} ${styles.teamBtn}`} id="prev">
          ❮
        </button>
        <button onClick={next} className={`${styles.next} ${styles.teamBtn}`} id="next">
          ❯
        </button>

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
    </section>
  );
};

export default Team;
