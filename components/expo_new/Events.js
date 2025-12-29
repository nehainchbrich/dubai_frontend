"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/expo_new/Events.module.css";
import Image from "next/image";
import {
  expoDateFormat,
  formatEventDatesWithSuffix,
  imageKitLoader,
} from "@/helper/Helper";
import Link from "next/link";

const Events = ({ data = [] }) => {
  const contentRefs = useRef([]);

  // normalize statuses
  const normalizeStatus = (status) =>
    typeof status === "string" ? status.trim().toUpperCase() : "";

  // group expos by status
  const activeExpos = data.filter(
    (expo) =>
      normalizeStatus(expo.status) === "ACTIVE" ||
      (normalizeStatus(expo.status) === "UPCOMING" &&
        Number(expo.default_status) === 1)
  );
console.log(activeExpos);
  const expoDate = activeExpos.length
    ? formatEventDatesWithSuffix(activeExpos[0].eventDate)
    : "";

  const upcomingExpos = data.filter(
    (expo) => normalizeStatus(expo.status) === "UPCOMING"
  );
  const completedExpos = data.filter(
    (expo) => normalizeStatus(expo.status) === "COMPLETED"
  );

  const sections = [
    {
      title: "Current Events",
      desc: activeExpos.length
        ? `${activeExpos[0]?.venue} ${expoDate[0]?.label} and ${expoDate[1]?.label}`
        : "No current events",
      expos: activeExpos,
    },
    {
      title: "Scheduled Events",
      desc: `${upcomingExpos[0]?.city} Stay tuned for Details `,
      expos: upcomingExpos,
    },
    {
      title: "Past Events",
      desc: "A series of exclusive events that brought Dubai’s best projects to India.",
      expos: completedExpos,
    },
  ].filter((s) => s.expos.length > 0);

  const [activeIndexes, setActiveIndexes] = useState(sections.map(() => 0));

  const handleNext = (sectionIdx, total) => {
    setActiveIndexes((prev) => {
      const updated = [...prev];
      updated[sectionIdx] = (updated[sectionIdx] + 1) % total;
      return updated;
    });
  };

  const handlePrev = (sectionIdx, total) => {
    setActiveIndexes((prev) => {
      const updated = [...prev];
      updated[sectionIdx] = (updated[sectionIdx] - 1 + total) % total;
      return updated;
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.2 }
    );

    contentRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.containerEvent} id="events">
      <div className={styles.OurFormulaSectionHeading}>Our Events</div>
      <div className={styles.OurFormulaFormulaSubHeading}>
        <p>
          {`After showcasing Dubai’s finest properties across India, we’re hosting the 4th edition of the Dubai Property Expo in Hyderabad.`}
        </p>
      </div>

      <div className={styles.backgroundGradient}>
        <div
          className={`${styles.WhatWeDoWhatWeDoContainer} ${styles.pageContainer}`}
        >
          {sections.map((section, idx) => (
            <div key={idx} className={styles.WhatWeDoWhatWeDoWrap}>
              <div>
                {/* Slider */}
                <div
                  ref={(el) => (contentRefs.current[idx] = el)}
                  className={styles.WhatWeDoWhatWeDoCotentList}
                >
                  <div className={styles.WhatWeDoBoxContent}>
                    <section className={styles.eventsSection}>
                      <div className={styles.eventTitle}>
                        <h3>{section.title}</h3>
                        <p>{section.desc}</p>
                        {section.title === "Current Events" &&
                          activeExpos.length > 0 && (
                            <Link
                              className={styles.btnClass}
                              href="/expo-invitation"
                            >
                              Book Your Free VIP Pass
                            </Link>
                          )}
                      </div>

                      {/* ✅ Whole section clickable */}
                      {section.expos.length > 0 && (
                        <Link
                          href={normalizeStatus(
                              section.expos[activeIndexes[idx]].status
                            ) !== "UPCOMING"
                              ? `/events/${section.expos[activeIndexes[idx]].slug}`
                              : `/blogs/${section.expos[activeIndexes[idx]].blog_link}`
                          }
                          className={styles.eventsSliderWrapper}
                        >
                          <div
                            className={styles.eventsSlider}
                            style={{
                              transform: `translateX(-${
                                activeIndexes[idx] * 100
                              }%)`,
                              transition: "transform 0.6s ease",
                              display: "flex",
                            }}
                          >
                            {section.expos.map((item, i) => (
                              <div
                                key={i}
                                className={styles.eventCard}
                                style={{ minWidth: "100%" }}
                              >
                                <div className={styles.eventContent}>
                                  <div className={styles.eventImg}>
                                    <Image
                                      loader={imageKitLoader}
                                      src={item.venue_img}
                                      alt={item.title}
                                      width={400}
                                      height={250}
                                    />
                                  </div>
                                  <div className={styles.zIndex}>
                                    <h3>{item.eventName}</h3>
                                    <p>
                                      <b>{item.venue}</b>
                                    </p>
                                    <p>
                                      {item.eventDate
                                        ? expoDateFormat(item.eventDate).join(
                                            ", "
                                          )
                                        : ""}
                                    </p>

                                    {/* ✅ Keep per-card View More button */}
                                    <div className={styles.dFlex}>
                                      {normalizeStatus(item.status) !==
                                      "UPCOMING" ? (
                                        <Link
                                          className={styles.viewMore}
                                          href={`/events/${item.slug}`}
                                          onClick={(e) =>
                                            e.stopPropagation()
                                          } // prevent wrapper link
                                        >
                                          View More
                                        </Link>
                                      ) : (
                                        <Link
                                          className={styles.viewMore}
                                          href={`/blogs/${item.blog_link}`}
                                          onClick={(e) =>
                                            e.stopPropagation()
                                          }
                                        >
                                          View More
                                        </Link>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* Controls */}
                          {section.expos.length > 1 && (
                            <>
                              <div
                                className={`${styles.eventArrow} ${styles.left}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handlePrev(idx, section.expos.length);
                                }}
                              >
                                ❮
                              </div>
                              <div
                                className={`${styles.eventArrow} ${styles.right}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleNext(idx, section.expos.length);
                                }}
                              >
                                ❯
                              </div>
                            </>
                          )}
                        </Link>
                      )}
                    </section>
                  </div>
                </div>
                {/* End Slider */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
