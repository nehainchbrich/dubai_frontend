import React, { useEffect, useRef } from "react";
import styles from "../../styles/expo_new/Developer.module.css";
import Image from "next/image";
import { imageKitLoader } from "@/helper/Helper";

const Developers = ({ data = [], section }) => {
  const trackRef = useRef(null);

  useEffect(() => {
    if (section?.eventMode !== "single" && trackRef.current) {
      const track = trackRef.current;

      if (track.dataset.cloned !== "true") {
        track.innerHTML += track.innerHTML;
        track.dataset.cloned = "true";
      }
    }
  }, [section?.eventMode]);

  /* ================= SINGLE MODE ================= */
  if (section?.eventMode === "single") {
    return (
      <div className={styles.singleDeveloper}>
        <Image
          loader={imageKitLoader}
          src={section?.sectionResource}
          alt={section?.sectionHeading}
          width={220}
          height={120}
        />
      </div>
    );
  }

  /* ================= FULL WIDTH SLIDER ================= */
  return (
    <section className={styles.developersFull}>
      <div className={styles.slider}>
        <div className={styles.track} ref={trackRef}>
          {data.map((item, i) => (
            <div className={styles.logoItem} key={i}>
              <Image
                loader={imageKitLoader}
                src={item.logo}
                alt={item.name}
                width={180}
                height={90}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Developers;
