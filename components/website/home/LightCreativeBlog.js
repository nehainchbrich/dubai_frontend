"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/LightCreativeBlog.module.css';
import { imageKitLoader } from '@/helper/Helper';

const LightCreativeBlog = ({ data }) => {
    if (!data || data.length === 0) return null;

    // First card is featured, next 2 are secondary
    const featured = data[0];
    const secondary = data.slice(1, 3);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <section className={styles.creativeBlogSection}>
            <div className="container">
                {/* Header Section */}
                <div className={styles.headerWrap}>
                    <div>
                        <span className={styles.topBadge}>News & Stories</span>
                        <h2 className={styles.mainTitle}>
                            Latest <span>Insights</span>
                        </h2>
                        <p className={styles.description}>
                            Stay ahead with our expert analysis and property trends from Dubai's dynamic landscape.
                        </p>
                    </div>
                    <div className={styles.viewAllBottom}>
                        <Link href="/blogs" className={styles.viewAllBtn}>
                            Explore All Insights <i className="fas fa-external-link-alt"></i>
                        </Link>
                    </div>
                </div>

                {/* Grid Section */}
                <div className={styles.blogGrid}>
                    {/* Main Featured Card - Horizontal */}
                    <div className={styles.featuredCard}>
                        <div className={styles.imageWrapper}>
                            <div className={styles.category}>{featured.category?.name || 'Real Estate'}</div>
                            <Image
                                loader={imageKitLoader}
                                src={featured.thumbnail || featured.image || '/images/banner.jpg'}
                                alt={featured.title}
                                fill
                                className={styles.blogImage}
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        <div className={styles.contentBody}>
                            <div className={styles.meta}>
                                <span>{formatDate(featured.createdAt)}</span>
                                <span>4 min read</span>
                            </div>
                            <h3 className={styles.cardTitle}>{featured.title}</h3>
                            <p className={styles.excerpt}>
                                {featured.shortDesc || "Explore the latest market shifts and investment opportunities in Dubai."}
                            </p>
                            <Link href={`/blogs/${featured.slug}`} className={styles.readMore}>
                                Read Full Story <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>

                    {/* Horizontal row for secondary cards */}
                    <div className={styles.sideColumnRow}>
                        {data.slice(1, 4).map((blog, idx) => (
                            <div key={idx} className={styles.secondaryCard}>
                                <Link href={`/blogs/${blog.slug}`} className="text-decoration-none">
                                    <div className={styles.secCategory}>{blog.category?.name || 'Trends'}</div>
                                    <h4 className={styles.secTitle}>{blog.title}</h4>
                                    <div className={styles.secMeta}>
                                        {formatDate(blog.createdAt)}
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Link */}

            </div>
        </section>
    );
};

export default LightCreativeBlog;
