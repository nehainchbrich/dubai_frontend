import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Team.module.css";
import Image from "next/image";
import { imageKitLoader, ImagePath } from "@/helper/Helper";
import Link from "next/link";

const Team = ({ data = [], section, event }) => {
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
    "Meet the leadership behind our growth.";

  const trackRef = useRef(null);
  const autoId = useRef(null);

  const [index, setIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const [isHovered, setIsHovered] = useState(false);

  /* ================= RESPONSIVE ================= */
  useEffect(() => {
    const update = () => {
      const show =
        window.innerWidth <= 600 ? 1 :
          window.innerWidth <= 900 ? 2 :
            window.innerWidth <= 1200 ? 3 :
              4;
      setSlidesToShow(show);
      setIndex(0);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* ================= SLIDE MOVE ================= */
  useEffect(() => {
    if (!trackRef.current) return;
    const card = trackRef.current.children[0];
    if (!card) return;

    const gap = 20; // Matches CSS
    const width = card.getBoundingClientRect().width; // cardWrap width (includes padding)
    // Note: cardWrap has padding, so width is full width including padding. 
    // Wait, flex gap is on the track.
    // CSS says: .track { gap: 20px; }
    // .cardWrap is flex: 0 0 25%.
    // Actually, if we use flex gap, the calculation is (width + gap).
    // Let's verify if cardWrap width includes the gap. No, flex items are separated by gap.

    // Correction: cardWrap width is just the item width.
    const slideDist = width + gap;

    trackRef.current.style.transform = `translateX(${-index * slideDist}px)`;
    trackRef.current.style.transition = "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
  }, [index, slidesToShow]);

  const next = () => {
    const max = data.length - slidesToShow;
    setIndex((p) => (p >= max ? 0 : p + 1));
  };

  const prev = () => {
    const max = data.length - slidesToShow;
    setIndex((p) => (p <= 0 ? max : p - 1));
  };

  /* ================= AUTOPLAY ================= */
  useEffect(() => {
    if (!isHovered) {
      autoId.current = setInterval(next, 4000);
    }
    return () => clearInterval(autoId.current);
  }, [slidesToShow, isHovered]);

  return (
    <section className={styles.teamSection}>
      <h2>{section?.sectionHeading || "Our Team"}</h2>
      <p
        className={styles.lead}
        dangerouslySetInnerHTML={{ __html: description }}
      />

      <div
        className={styles.sliderWrapper}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={styles.track} ref={trackRef}>
          {data.map((item, i) => (
            <div className={styles.cardWrap} key={i}>
              <div className={styles.card}>
                <Image
                  loader={imageKitLoader}
                  src={item.profile}
                  alt={item.firstName}
                  width={400}
                  height={600}
                  className={styles.image}
                />
                <div className={styles.info}>
                  <h3>{item.firstName}</h3>
                  <span>{item.designation}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className={`${styles.nav} ${styles.prev}`} onClick={prev}>
          ❮
        </button>
        <button className={`${styles.nav} ${styles.next}`} onClick={next}>
          ❯
        </button>
      </div>

      {activeExpos.length > 0 && (
        <Link href="/expo-invitation" className={styles.cta}>
          Free VIP Pass
        </Link>
      )}
    </section>
  );
};

export default Team;
