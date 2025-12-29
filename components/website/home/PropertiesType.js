"use client";
import { useEffect, useRef, useState } from "react";
import styles from "../../../styles/PropertiesType.module.css";
import PropertyFeature from "../property/PropertyFeature";
import {
  developer,
  enjoyaday,
  featureProperty,
  location,
  offplanProperty,
  propertyType,
  readytomove,
  service,
  team,
  whyUs,
} from "@/components/website/home/HomeContent";
import OffPlan from "../property/OffPlan";
import OffPlanCard from "../property/OffPlanCard";
import Link from "next/link";

const ScrollTransition = ({ data }) => {
  console.log(data);
  const [loading, setLoading] = useState(true);
  const bg1Ref = useRef(null);
  const bg2Ref = useRef(null);
  const isBg1ActiveRef = useRef(true);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const bg1 = bg1Ref.current;
    const bg2 = bg2Ref.current;
    let isBg1Active = isBg1ActiveRef.current;
    const sections = sectionRefs.current;

    // Text fade/translate on scroll
    const handleScroll = () => {
      sections.forEach((section) => {
        const content = section?.querySelector?.(`.${styles.sectionContent}`);
        if (!content) return;

        const rect = section.getBoundingClientRect();
        const winH = window.innerHeight;
        const progress = Math.min(
          Math.abs(rect.top + rect.height / 2 - winH / 2) / (winH / 2),
          1
        );

        content.style.transform = `translateY(${progress * -20}px)`;
        content.style.opacity = `${1 - progress}`;
      });
    };

    window.addEventListener("scroll", handleScroll);

    // Background crossfade logic
    const bgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const newBg = entry.target.getAttribute("data-bg");
            const nextBg = isBg1Active ? bg2 : bg1;
            const currentBg = isBg1Active ? bg1 : bg2;

            if (nextBg) {
              nextBg.style.backgroundImage = `url('${newBg}')`;
              nextBg.classList.add(styles.active);
            }
            if (currentBg) {
              currentBg.classList.remove(styles.active);
            }

            isBg1Active = !isBg1Active;
            isBg1ActiveRef.current = isBg1Active;
          }
        });
      },
      { threshold: 0.6 }
    );

    // Observe only valid DOM elements
    sections
      .filter((section) => section instanceof Element)
      .forEach((section) => bgObserver.observe(section));

    // ✅ Safe cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections
        .filter((section) => section instanceof Element)
        .forEach((section) => bgObserver.unobserve(section));
    };
  }, []);


  const { readyProperty, offplan, featured } = data;
  const baseUrl = process.env.API_URL || "";

  // Standardize thumbnail paths
  const getImgUrl = (path) => {
    if (!path) return "";
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `${baseUrl}${cleanPath}`;
  };

  const initialBg = featured?.[0]?.thumbnail ? getImgUrl(featured[0].thumbnail) : "";

  return (
    <div className={styles.positionRelative}>
      <section className={styles.mainTransitions}>
        {/* Backgrounds */}
        <div className={styles.backgroundContainer}>
          <div
            id="bg1"
            ref={bg1Ref}
            className={`${styles.backgroundImg} ${styles.active}`}
            style={{ backgroundImage: `url('${initialBg}')` }}
          />
          <div id="bg2" ref={bg2Ref} className={styles.backgroundImg} />
        </div>

        {/* Section 1 */}
        {featured?.[0] && (
          <div
            className={styles.section}
            data-bg={getImgUrl(featured[0].thumbnail)}
            ref={(el) => (sectionRefs.current[0] = el)}
          >
            <div className={styles.sectionContent}>
              <h2>Featured Properties</h2>
              <h3 className={styles.title}>{featured[0].title}</h3>
              <p>{featured[0].shortDesc}</p>
              <Link href='/buy-property-in-dubai' className={styles.btns}>View More →</Link>
            </div>
          </div>
        )}

        {/* Section 2 */}
        {offplan?.[0] && (
          <div
            className={styles.section}
            data-bg={getImgUrl(offplan[0].thumbnail)}
            ref={(el) => (sectionRefs.current[1] = el)}
          >
            <div className={styles.sectionContent}>
              <h2>Offplan Properties</h2>
              <h3 className={styles.title}>{offplan[0].title}</h3>
              <p>{offplan[0].shortDesc}</p>
              <Link href='/off-plan-properties-in-dubai' className={styles.btns}>View More →</Link>
            </div>
          </div>
        )}

        {/* Section 3 */}
        {readyProperty?.[0] && (
          <div
            className={styles.section}
            data-bg={getImgUrl(readyProperty[0].thumbnail)}
            ref={(el) => (sectionRefs.current[2] = el)}
          >
            <div className={styles.sectionContent}>
              <h2>Ready to Move Properties</h2>
              <h3 className={styles.title}>{readyProperty[0].title}</h3>
              <p>{readyProperty[0].shortDesc}</p>
              <Link href='/ready-to-move-properties' className={styles.btns}>View More →</Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default ScrollTransition;
