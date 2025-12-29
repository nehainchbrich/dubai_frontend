import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/Builder.module.css';
import { imageKitLoader } from '@/helper/Helper';

const Builder = ({ data, heading }) => {
  if (!data || data.length === 0) return null;

  // Split data into two rows
  const midPoint = Math.ceil(data.length / 2);
  const row1Data_raw = data.slice(0, midPoint);
  const row2Data_raw = data.slice(midPoint);

  // Fallback if row 2 is empty/short
  const row1 = row1Data_raw.length ? [...row1Data_raw, ...row1Data_raw, ...row1Data_raw] : [];
  const row2 = row2Data_raw.length ? [...row2Data_raw, ...row2Data_raw, ...row2Data_raw] : [...row1Data_raw, ...row1Data_raw, ...row1Data_raw];

  return (
    <div className={styles.builderSection}>
      <div className="container">

        {/* Header */}
        <div className={styles.headerWrapper}>
          <div>
            {/* <h2 className={styles.title}>Popular Developers</h2> */}
            {/* Subtitle hidden via CSS */}
            <div className={styles.subTitle} dangerouslySetInnerHTML={{ __html: heading }} />
          </div>
          <div>
            <Link href='/top-real-estate-developer-in-dubai' className={styles.viewAllBtn}>
              View All →
            </Link>
          </div>
        </div>
      </div>

      {/* Wall Layout */}
      <div className={styles.wallContainer}>

        {/* Row 1: Left Scroll */}
        <div className={`${styles.brickRow} ${styles.scrollLeft}`}>
          {row1.map((item, index) => (
            <div key={`r1-${index}`} className={styles.brick}>
              <Link href={`/top-real-estate-developer-in-dubai/${item.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Image
                  loader={imageKitLoader}
                  src={`${item.logo}`}
                  alt={item.name}
                  width={180}
                  height={90}
                  className={styles.logoImg}
                />
              </Link>
            </div>
          ))}
        </div>

        {/* Row 2: Right Scroll */}
        <div className={`${styles.brickRow} ${styles.scrollRight}`}>
          {row2.map((item, index) => (
            <div key={`r2-${index}`} className={styles.brick}>
              <Link href={`/top-real-estate-developer-in-dubai/${item.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <Image
                  loader={imageKitLoader}
                  src={`${item.logo}`}
                  alt={item.name}
                  width={180}
                  height={90}
                  className={styles.logoImg}
                />
              </Link>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Builder
