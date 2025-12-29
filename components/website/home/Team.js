"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/OurTeam.module.css";
import { imageKitLoader } from '@/helper/Helper';
import AgentCard from "../common/AgentCard";

export default function OurTeam({ data, type, heading, item }) {

  const filteredData = data.filter((item) => {
    if (type === "agent") {
      return item.is_agent === 1;
    } else {
      return item.is_agent === 1 || item.is_agent === 0;
    }
  });

  const limitedData = filteredData.slice(0, 12);

  const trackRef = useRef(null);
  const [position, setPosition] = useState(0);

  const scroll = (direction) => {
    const track = trackRef.current;
    if (!track) return;

    const cardWidth = track.querySelector(`.${styles.teamCard}`).offsetWidth + 18; // include gap
    let newPosition = position + (direction === "left" ? cardWidth : -cardWidth);

    // Prevent over-scrolling
    const maxScroll = 0;
    const minScroll = -(track.scrollWidth - track.parentElement.offsetWidth);

    if (newPosition > maxScroll) newPosition = maxScroll;
    if (newPosition < minScroll) newPosition = minScroll;

    setPosition(newPosition);
    track.style.transform = `translateX(${newPosition}px)`;
  };


  return (
    <div className="container">
      <section className={styles.ourTeamSection}>
        {/* Info Section */}
        <div className={styles.teamInfo}>
          <h2>Our Team</h2>
          <p>
            Meet our experienced and passionate team, dedicated to delivering the
            best real estate solutions in Dubai.
          </p>
        </div>

        {/* Slider Section */}
        <div className={styles.teamSlider}>
          <button className={`${styles.teamBtn} ${styles.left}`} onClick={() => scroll("left")}>
            &#10094;
          </button>

          <div className={styles.teamTrack} ref={trackRef}>
          {limitedData.map((item, index) => (
             <AgentCard item={item} type={'team'} />
           ))}
          </div>

          <button className={`${styles.teamBtn} ${styles.right}`} onClick={() => scroll("right")}>
            &#10095;
          </button>
        </div>
      </section>
    </div>
  );
}
