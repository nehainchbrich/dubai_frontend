"use client";
import React, { useState } from "react";
import styles from "../../styles/expo_new/Vip.module.css";
import Image from "next/image";
import { ImagePath } from "@/helper/Helper";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const Vip = ({ section }) => {
  const description = ImagePath(section?.sectionSubHeading);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const images = [section?.sectionResource, section?.ResourceTwo];

  return (
    <div>
      <section className={styles.vipSection}>
        <h2 className={styles.vipHeading}>{section?.sectionHeading}</h2>
        <div
          className={styles.lead}
          dangerouslySetInnerHTML={{ __html: description }}
        ></div>

        <div className={styles.vipContainer}>
          {images.map((src, i) => (
            <div
              key={i}
              className={styles.vipItem}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              style={{ cursor: "pointer" }}
            >
              <Image src={src} alt="vip image" width={200} height={200} />
              <p>{i === 0 ? "Invitation" : "Pass"}</p>
            </div>
          ))}
        </div>
      </section>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={images.map((src) => ({ src }))}
      />
    </div>
  );
};

export default Vip;
