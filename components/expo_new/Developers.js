import React, { useEffect, useRef } from "react";
import styles from "../../styles/expo_new/Developer.module.css";
import Image from "next/image";
import { imageKitLoader } from "@/helper/Helper";

const Developers = ({ data, section }) => {
  const logosRef = useRef(null);
  const slideRef = useRef(null);

  useEffect(() => {
    if (section?.eventMode !== "single" && logosRef.current && slideRef.current) {
      // Prevent multiple clones on re-renders
      if (logosRef.current.children.length < 2) {
        const copy = slideRef.current.cloneNode(true);
        logosRef.current.appendChild(copy);
      }
    }
  }, [section?.eventMode]);

  // ✅ Case 1: Single Event Mode
  if (section?.eventMode === "single") {
    return (
      <div className={styles.singleDeveloper}>
        {section?.sectionResource && (
          <Image
            src={section?.sectionResource}
            alt={section?.sectionHeading}
            width={200}
            height={120}
          />
        )}
      </div>
    );
  }

  // ✅ Case 2: Normal → loop logos
  return (
    <div className={styles.logos} ref={logosRef}>
      <div className={styles.logosSlide} ref={slideRef}>
        {data?.map((item, i) => (
          <Image
            loader={imageKitLoader}
            key={i}
            src={item.logo}
            alt={item.name}
            width={200}
            height={120}
          />
        ))}
      </div>
    </div>
  );
};

export default Developers;
