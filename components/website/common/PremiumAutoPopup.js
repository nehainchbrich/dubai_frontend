import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '@/styles/PremiumAutoPopup.module.css';

const PremiumAutoPopup = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem('hasSeenPremiumPopup');
            if (!hasSeenPopup) {
                setIsVisible(true);
            }
        }, 6000); // 6 second delay

        return () => clearTimeout(timer);
    }, []);

    const closePopup = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenPremiumPopup', 'true');
    };

    if (!isMounted) return null;

    return (
        <div className={`${styles.popupOverlay} ${isVisible ? styles.popupVisible : ''}`}>
            <div className={styles.popupContainer}>
                <div className={styles.imageSection}>
                    <img
                        src="https://images.unsplash.com/photo-1582653280643-e7ae5736df6a?q=80&w=2070&auto=format&fit=crop"
                        alt="Dubai Skyline"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className={styles.overlayText}>
                        <p>Signature Series 2024</p>
                        <h2>Dubai's Most <br /> Coveted Addresses.</h2>
                    </div>
                </div>

                <div className={styles.contentSection}>
                    <button className={styles.closeBtn} onClick={closePopup} aria-label="Close">
                        <i className="fas fa-times"></i>
                    </button>

                    <span className={styles.formTag}>Priority Concierge</span>
                    <h3 className={styles.mainHeading}>Request Your <br /> Private Portfolio</h3>

                    <form onSubmit={(e) => { e.preventDefault(); closePopup(); }}>
                        <div className={styles.formGroup}>
                            <input type="text" id="popName" required />
                            <label htmlFor="popName">Full Name</label>
                        </div>
                        <div className={styles.formGroup}>
                            <input type="email" id="popEmail" required />
                            <label htmlFor="popEmail">WhatsApp or Email</label>
                        </div>
                        <div className={styles.formGroup}>
                            <input type="tel" id="popBudget" required />
                            <label htmlFor="popBudget">Investment Budget (AED)</label>
                        </div>

                        <button type="submit" className={styles.submitBtn}>
                            Secure Early Access
                        </button>
                    </form>

                    <div className={styles.footerInfo}>
                        <i className="fab fa-whatsapp"></i>
                        <span>Immediate response via our Platinum <br /> Concierge Desk. 100% Privacy guaranteed.</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PremiumAutoPopup;
