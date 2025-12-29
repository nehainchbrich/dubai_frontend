"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/WhyDubaiShowcase.module.css';
import { imageKitLoader } from '@/helper/Helper';

const WhyDubaiShowcase = () => {
    const benefits = [
        {
            title: "Safest City in the World",
            desc: "consistently ranked as one of the most secure places for families and businesses.",
            icon: "fa-shield-alt",
            link: "/blogs/which-is-the-safest-city-in-the-world-dubai-as-per-reports"
        },
        {
            title: "Freehold Ownership",
            desc: "Full ownership rights for international investors in designated areas.",
            icon: "fa-key",
            link: "/blogs/what-is-a-freehold-property-in-dubai"
        },
        {
            title: "Long Term Golden Visa",
            desc: "Residency for up to 10 years for property investors and their families.",
            icon: "fa-passport",
            link: "/blogs/how-to-get-dubai-golden-visa-2"
        },
        {
            title: "Worldwide Connectivity",
            desc: "Strategic location serving as a gateway between East and West hubs.",
            icon: "fa-globe",
            link: "/blogs/do-you-know-these-upcoming-transportation-systems-in-uae-2"
        },
        {
            title: "High Capital Appreciation",
            desc: "Consistently strong growth in property value across prime locations.",
            icon: "fa-chart-line",
            link: "/blogs/dubai-real-estate"
        },
        {
            title: "Ease of Investment",
            desc: "Straightforward and transparent legal frameworks for global buyers.",
            icon: "fa-hand-holding-usd",
            link: "/blogs/the-golden-opportunities-invest-in-dubai-for-long-term-growth"
        },
        {
            title: "100% Income Tax Free",
            desc: "Zero income tax on rental yields and zero capital gains tax.",
            icon: "fa-percentage",
            link: "/blogs/100-tax-free-income-in-dubai"
        },
        {
            title: "Fastest Growing Economy",
            desc: "A stable and rapidly expanding economic environment with high ROI.",
            icon: "fa-rocket",
            link: "/blogs/unexpected-rise-in-dubai-real-estate-market-till-new-year"
        }
    ];

    return (
        <section className={styles.whyDubaiArea}>
            <div className={styles.bgWrapper}>
                <Image
                    loader={imageKitLoader}
                    src="https://admin.inchbrick.com/uploads/posts/post-2601729063533.webp"
                    alt="Dubai Skyline"
                    fill
                    className={styles.bgImage}
                    priority
                />
                <div className={styles.overlay}></div>
            </div>

            <div className="container">
                <div className={styles.contentWrapper}>
                    <h2 className={styles.mainTitle}>
                        Why Invest in <br /><span>Dubai?</span>
                    </h2>

                    <div className={styles.pointsGrid}>
                        {benefits.map((benefit, index) => (
                            <Link
                                key={index}
                                href={benefit.link}
                                className={styles.pointItem}
                            >
                                <div className={styles.iconCircle}>
                                    <i className={`fas ${benefit.icon}`}></i>
                                </div>
                                <h3 className={styles.pointTitle}>{benefit.title}</h3>
                            </Link>
                        ))}
                    </div>

                    <div className={styles.ctaBox}>
                        <Link href="#" data-bs-toggle="modal" data-bs-target="#triggerFrm" className="btns btn-blue py-3">
                            Speak with an advisor <i className="fas fa-arrow-right ms-2"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhyDubaiShowcase;
