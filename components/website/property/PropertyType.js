import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from "../../../styles/PropertyType.module.css";
import { imageKitLoader, shortDesc } from '@/helper/Helper';
import Image from 'next/image';
import React from 'react';

const PropertyType = ({ data, heading }) => {
  const router = useRouter();

  // If no data, return null
  if (!data || data.length === 0) return null;

  return (
    <section className={styles.propertySection}>
      <div className='container'>
        <div className={styles.sectionHeader}>
          <div className={styles.watermark}>Explore</div>
          <h2 className={styles.titleMain}>
            What Are You <span>Looking For?</span>
          </h2>
          <p className={styles.subTitle}>
            Discover your dream property from our curated collection of premium Dubai real estate.
          </p>
        </div>

        {/* Stacked Parallax Scroll Section */}
        <div className={styles.scrollContainer}>
          {data && data.map((item, index) => (
            <div
              key={index}
              className={styles.stickyWrapper}
              style={{
                zIndex: index + 1,
                top: '80px' // Fixed top for all cards to stack flush
              }}
            >
              <div className={styles.stackCard}>
                {/* Info Side */}
                <div className={styles.cardInfo}>
                  <span className={styles.indexNum}>{String(index + 1).padStart(2, '0')}</span>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.cardDesc}>
                    <p dangerouslySetInnerHTML={{ __html: shortDesc(item.description, 160) }} />
                  </div>
                  <div className={styles.btnRow}>
                    <button
                      className={styles.viewBtn}
                      onClick={() => router.push(`/residential-properties/${item.slug}`)}
                    >
                      View Properties
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                    </button>
                  </div>
                </div>

                {/* Image Side */}
                <div className={styles.cardImageContainer}>
                  <Image
                    loader={imageKitLoader}
                    src={item.thumbnail}
                    alt={item.title}
                    fill
                    className={styles.bgImage}
                    sizes="(max-width: 992px) 100vw, 60vw"
                    style={{ objectFit: 'cover' }}
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default PropertyType
