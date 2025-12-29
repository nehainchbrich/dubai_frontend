"use client";
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../../styles/HomePropertyShowcase.module.css';
import { imageKitLoader, currencyConverter } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
import { useCurrency } from '@/context/CurrencyProvider';

const PropertyCard = ({ item, categoryLabel }) => {
    const { currency } = useCurrency();
    const [price, setPrice] = useState('Ask for Price');

    useEffect(() => {
        const fetchPrice = async () => {
            if (item.minAmount && parseInt(item.minAmount) > 0) {
                const converted = await currencyConverter(parseInt(item.minAmount), currency);
                setPrice(converted);
            }
        };
        fetchPrice();
    }, [item, currency]);

    return (
        <div className={styles.propCard}>
            <Link href={`/properties/${item.slug}`}>
                <div className={styles.imageBox}>
                    {item.PCategory && <span className={styles.badge}>{item.PCategory.title}</span>}
                    <Image
                        loader={imageKitLoader}
                        src={item.thumbnail}
                        alt={item.title}
                        fill
                        className={styles.propImg}
                        placeholder="blur"
                        blurDataURL={staticBlurDataUrl()}
                        sizes='(max-width: 768px) 100vw, 320px'
                    />
                </div>
                <div className={styles.cardContent}>
                    <span className={styles.category}>{categoryLabel}</span>
                    <h3 className={styles.title}>{item.title}</h3>
                    <div className={styles.location}>
                        <i className="fas fa-map-marker-alt"></i>
                        {item.city}, {item.country}
                    </div>
                    <div className={styles.cardFooter}>
                        <div className={styles.price}>{price}</div>
                        <span className={styles.viewBtn}>
                            Details <i className="fas fa-arrow-right"></i>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

const HomePropertyShowcase = ({ data }) => {
    const [activeTab, setActiveTab] = useState('featured');
    const scrollRef = useRef(null);

    const { featured = [], offplan = [], readyProperty = [] } = data;

    const tabs = [
        { id: 'featured', label: 'Featured Properties', data: featured, color: 'Featured' },
        { id: 'offplan', label: 'Off-Plan Projects', data: offplan, color: 'Off-Plan' },
        { id: 'ready', label: 'Ready to Move', data: readyProperty, color: 'Ready' }
    ];

    const currentTabData = tabs.find(t => t.id === activeTab);

    return (
        <section className={styles.showcaseArea}>
            <div className="container">
                <div className={styles.sectionHeader}>
                    <div className={styles.watermark}>Luxury</div>
                    <h2 className={styles.titleMain}>
                        Property <span>Portfolio</span>
                    </h2>
                </div>

                <div className={styles.tabControls}>
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`${styles.tabBtn} ${activeTab === tab.id ? styles.active : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.sliderPane}>
                <div className={styles.sliderOverlayLeft}></div>
                <div className={styles.sliderOverlayRight}></div>
                <div className={styles.sliderTrack} ref={scrollRef}>
                    {currentTabData?.data?.map((item, index) => (
                        <PropertyCard
                            key={`${activeTab}-${index}`}
                            item={item}
                            categoryLabel={currentTabData.color}
                        />
                    ))}
                    {currentTabData?.data?.length === 0 && (
                        <div className="text-center w-100 py-5 opacity-50">
                            No properties available in this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default HomePropertyShowcase;
