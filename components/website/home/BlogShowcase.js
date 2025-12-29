import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/BlogShowcase.module.css';
import { imageKitLoader } from '@/helper/Helper';

const BlogShowcase = ({ data }) => {
    if (!data || data.length === 0) return null;

    // Get featured blog (first one) and other blogs
    const featuredBlog = data[0];
    const otherBlogs = data.slice(1, 4); // Get next 3 blogs

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className={styles.blogShowcase}>
            <div className="container">
                {/* Header */}
                <div className={styles.headerSection}>
                    <div className={styles.headerContent}>
                        <span className={styles.badge}>Latest Insights</span>
                        <h2 className={styles.mainTitle}>
                            Stories & <span className={styles.highlight}>Insights</span>
                        </h2>
                        <p className={styles.subtitle}>
                            Discover the latest trends, expert advice, and market insights from Dubai's real estate landscape
                        </p>
                    </div>
                    <Link href="/blogs" className={styles.viewAllLink}>
                        <span>Explore All Articles</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>

                {/* Blog Grid */}
                <div className={styles.blogGrid}>
                    {/* Featured Blog - Large Card */}
                    <div className={styles.featuredCard}>
                        <Link href={`/blogs/${featuredBlog.slug}`} className={styles.featuredLink}>
                            <div className={styles.featuredImageWrapper}>
                                <Image
                                    loader={imageKitLoader}
                                    src={featuredBlog.image || '/images/default-blog.jpg'}
                                    alt={featuredBlog.title}
                                    fill
                                    className={styles.featuredImage}
                                    sizes="(max-width: 768px) 100vw, 60vw"
                                />
                                <div className={styles.featuredOverlay}>
                                    <div className={styles.categoryBadge}>
                                        {featuredBlog.category?.name || 'Real Estate'}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.featuredContent}>
                                <div className={styles.featuredMeta}>
                                    <span className={styles.readTime}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="10" />
                                            <path d="M12 6v6l4 2" />
                                        </svg>
                                        5 min read
                                    </span>
                                    <span className={styles.date}>
                                        {formatDate(featuredBlog.createdAt)}
                                    </span>
                                </div>
                                <h3 className={styles.featuredTitle}>{featuredBlog.title}</h3>
                                <p className={styles.featuredExcerpt}>
                                    {featuredBlog.description || featuredBlog.title}
                                </p>
                                <div className={styles.readMoreBtn}>
                                    <span>Read Full Story</span>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Other Blogs - Stacked Cards */}
                    <div className={styles.stackedCards}>
                        {otherBlogs.map((blog, index) => (
                            <Link
                                href={`/blogs/${blog.slug}`}
                                key={blog.id || index}
                                className={styles.stackedCard}
                                style={{ '--card-index': index }}
                            >
                                <div className={styles.stackedImageWrapper}>
                                    <Image
                                        loader={imageKitLoader}
                                        src={blog.image || '/images/default-blog.jpg'}
                                        alt={blog.title}
                                        fill
                                        className={styles.stackedImage}
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                    <div className={styles.stackedGradient}></div>
                                </div>
                                <div className={styles.stackedContent}>
                                    <div className={styles.stackedCategory}>
                                        {blog.category?.name || 'Real Estate'}
                                    </div>
                                    <h4 className={styles.stackedTitle}>{blog.title}</h4>
                                    <div className={styles.stackedMeta}>
                                        <span className={styles.stackedDate}>
                                            {formatDate(blog.createdAt)}
                                        </span>
                                        <span className={styles.stackedArrow}>→</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className={styles.decorCircle1}></div>
                <div className={styles.decorCircle2}></div>
            </div>
        </div>
    );
};

export default BlogShowcase;
