"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/DeveloperShowcase.module.css';
import { imageKitLoader } from '@/helper/Helper';

const DeveloperShowcase = ({ data }) => {
    const developers = Array.isArray(data) ? data : [];
    if (developers.length === 0) return null;

    // Split developers into two groups for two rows
    const half = Math.ceil(developers.length / 2);
    const row1Data = developers.slice(0, half);
    const row2Data = developers.slice(half);

    // Duplication for seamless infinite scroll
    const row1 = [...row1Data, ...row1Data, ...row1Data, ...row1Data];
    const row2 = [...row2Data, ...row2Data, ...row2Data, ...row2Data];

    const LogoCard = ({ item, idx }) => (
        <Link
            href={`/top-real-estate-developer-in-dubai/${item.slug}`}
            key={`dev-${idx}`}
            className={styles.logoBox}
        >
            <Image
                loader={imageKitLoader}
                src={item.logo || '/images/developer-placeholder.png'}
                alt={item.name}
                width={150}
                height={75}
                className={styles.logoImage}
                sizes="150px"
            />
        </Link>
    );

    return (
        <section className={styles.showcaseSection}>
            <div className="container">
                <div className={styles.titleWrapper}>
                    <span className={styles.subTitle}>World-Class Partners</span>
                    <h2 className={styles.titleMain}>
                        Our Strategic <span>Developers</span>
                    </h2>
                </div>
            </div>

            <div className={styles.sliderContainer}>
                <div className={styles.maskOverlayLeft}></div>
                <div className={styles.maskOverlayRight}></div>

                {/* Row 1: Moving Left */}
                <div className={styles.marqueeRow}>
                    <div className={`${styles.marquee} ${styles.scrollLeft}`}>
                        {row1.map((item, idx) => (
                            <LogoCard item={item} idx={`r1-${idx}`} key={`r1-${idx}`} />
                        ))}
                    </div>
                </div>

                {/* Row 2: Moving Right */}
                <div className={styles.marqueeRow}>
                    <div className={`${styles.marquee} ${styles.scrollRight}`}>
                        {row2.map((item, idx) => (
                            <LogoCard item={item} idx={`r2-${idx}`} key={`r2-${idx}`} />
                        ))}
                    </div>
                </div>
            </div>

            <div className={styles.viewAllWrapper}>
                <Link href="/top-real-estate-developer-in-dubai" className={styles.viewAll}>
                    Explore All Developers <i className="fas fa-arrow-right"></i>
                </Link>
            </div>
        </section>
    );
};

export default DeveloperShowcase;
