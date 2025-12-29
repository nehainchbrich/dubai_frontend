"use client";
import React, { useRef } from 'react';
import Image from 'next/image';
import styles from '../../../styles/TeamShowcase.module.css';
import { imageKitLoader } from '@/helper/Helper';

const TeamShowcase = ({ data }) => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    if (!data || data.length === 0) return null;

    // Filter and limit data consistently
    const teamMembers = data
        .filter(item => item.is_agent === 1 || item.is_agent === 0)
        .slice(0, 12);

    return (
        <section className={styles.teamSection}>
            <div className="container">
                <div className={styles.headerContainer}>
                    <h2 className={styles.title}>The <span>Signature</span> Team</h2>
                    <p className={styles.subtitle}>
                        Expert minds, passionate hearts, and Dubai's most trusted real estate advisors.
                    </p>
                </div>

                <div className={styles.teamWrapper} ref={scrollRef}>
                    {teamMembers.map((item, index) => (
                        <div key={index} className={styles.memberCard}>
                            <div className={styles.imageBox}>
                                <Image
                                    loader={imageKitLoader}
                                    src={item.profile}
                                    alt={`${item.firstName} ${item.lastName}`}
                                    fill
                                    className={styles.memberImage}
                                    sizes="280px"
                                />
                                <div className={styles.socialFloat}>
                                    <div className={styles.socialBtn}><i className="fab fa-linkedin-in"></i></div>
                                    <div className={styles.socialBtn}><i className="fab fa-instagram"></i></div>
                                </div>
                            </div>
                            <div className={styles.infoOverlay}>
                                <h3 className={styles.memberName}>{item.firstName} {item.lastName}</h3>
                                <span className={styles.memberRole}>{item.designation || 'Real Estate Advisor'}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.navContainer}>
                    <button className={styles.navBtn} onClick={() => scroll('left')}>
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className={styles.navBtn} onClick={() => scroll('right')}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TeamShowcase;
