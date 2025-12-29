import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const NoEvent = () => {
    return (
        <>
            <Head>
                <title>Expos & Events | Inchbrick Realty</title>
                <meta name="description" content="Stay tuned for upcoming property expos and exclusive investment events by Inchbrick Realty." />
            </Head>

            <div className="no-event-container">
                <div className="content-wrapper">
                    <div className="graphic-icon">
                        <span className="circle-bg"></span>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 2V5" stroke="#ffb700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M16 2V5" stroke="#ffb700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 9.09H20.5" stroke="#ffb700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#ffb700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.6947 13.7H15.7037" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M15.6947 16.7H15.7037" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9955 13.7H12.0045" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9955 16.7H12.0045" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.29431 13.7H8.30329" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8.29431 16.7H8.30329" stroke="#ffb700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    <h1 className="main-title">Our Next Dubai Property Expo Is Almost Here!</h1>
                    <p className="sub-text">
                        Register now & our Dubai team will connect with you right away to share expert insights and top investment opportunities.
                    </p>

                    <div className="action-area">
                        <Link href="/" className="btn-premium">
                            Explore Properties
                        </Link>
                        <Link href="/contact-us" className="btn-text">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-event-container {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: url('https://cdn.inchbrick.com/background/pr%20banner.jpg') center center/cover no-repeat;
                    overflow: hidden;
                    padding: 20px;
                    z-index: 9999;
                }

                .no-event-container::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: radial-gradient(circle at center, rgba(255, 183, 0, 0.03) 0%, transparent 50%);
                    animation: rotate 60s linear infinite;
                    z-index: 1;
                }

                .content-wrapper {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    max-width: 600px;
                    width: 100%;
                    padding: 3rem;
                    background:rgb(0 0 0 / 72%);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    backdrop-filter: blur(2px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .graphic-icon {
                    position: relative;
                    width: 80px;
                    height: 80px;
                    margin: 0 auto 2rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .circle-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, #ffb700 0%, #cc9200 100%);
                    border-radius: 50%;
                    opacity: 0.1;
                    animation: pulse 3s infinite ease-in-out;
                }

                .calendar-icon {
                    font-style: normal;
                    font-size: 2.5rem;
                    filter: grayscale(1) brightness(2);
                }

                .main-title {
                    font-family: 'Montserrat', sans-serif;
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 1rem;
                    background: linear-gradient(to right, #ffffff, #dcdcdc);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    letter-spacing: -0.5px;
                }

                .sub-text {
                    font-family: 'Montserrat', sans-serif;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 2.5rem;
                }

                .action-area {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    align-items: center;
                    z-index: 20;
                    position: relative;
                }

                :global(.btn-premium) {
                    display: inline-block;
                    padding: 14px 35px;
                    background: #ffb700; /* Fallback */
                    background: linear-gradient(90deg, #ffb700 0%, #e6a400 100%);
                    color: #000000 !important;
                    font-weight: 700;
                    font-size: 1rem;
                    border-radius: 50px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(255, 183, 0, 0.3);
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    border: none;
                    cursor: pointer;
                    opacity: 1;
                    visibility: visible;
                }

                :global(.btn-premium:hover) {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(255, 183, 0, 0.4);
                    background: #ffc107;
                }

                :global(.btn-text) {
                    color: #999999 !important;
                    font-size: 0.9rem;
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                    display: inline-block;
                    padding: 10px;
                }

                :global(.btn-text:hover) {
                    color: #ffb700 !important;
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                @keyframes pulse {
                    0% { transform: scale(1); opacity: 0.1; }
                    50% { transform: scale(1.1); opacity: 0.2; }
                    100% { transform: scale(1); opacity: 0.1; }
                }

                @media (max-width: 768px) {
                    .content-wrapper {
                        padding: 2rem 1.5rem;
                    }
                    .main-title {
                        font-size: 2rem;
                    }
                }
            `}</style>
        </>
    )
}

export default NoEvent
