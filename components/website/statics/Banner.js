import React, { useEffect } from 'react'
import CountUp from 'react-countup';
const Banner = () => {
    useEffect(() => {
        const counters = document.querySelectorAll('.counter');
        counters.forEach((counter) => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 100;

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }, []);
    return (
        <>
        <div className='width-full bg-dark pt-4'>
            <div className="banner_text">
                <div className='container text-center mb-4'>
                    <h1 className='heading'>Dubai Real Estate Market - Inchbrick Realty</h1>
                </div>
                <h2 className='text-center'>DUBAI REAL ESTATE MARKET OVERVIEW</h2>
                <h4 className='text-center'>DUBAI PROPERTY MARKET SUMMARY 2023 ( YTD)</h4>
                <div className='container'>
                <div className='row mb-5 mt-3'>
                    <div className="col-md-3">
                        <div className="counter_section">
                            <div className="counter_area">
                                <h3><CountUp start={0} end={63} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                                <p>Project Delivered</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter_section">
                            <div className="counter_area">
                                <h3><CountUp start={0} end={16475} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                                <p>Units Handed-Over</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter_section">
                            <div className="counter_area">
                                <h3><CountUp start={0} end={220.7} duration={15} separator="," delay={0} decimals={1} redraw={true} suffix='B' prefix=''></CountUp></h3>
                                <p>Total Sales Value</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="counter_section">
                            <div className="counter_area">
                                <h3><CountUp start={0} end={73823} duration={15} separator="," delay={0} decimals={0} redraw={true} suffix='' prefix=''></CountUp></h3>
                                <p>Total Sales Volume</p>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <style>
                {`
        .banner_text h1 {
            font-size: 40px;
            font-weight: bolder;
        }
        .banner_text h4 {
            font-size: 25px;
            font-weight: bolder;
            border: 6px solid;
            border-image: var(--two-side-border);
            padding: 10px;
        }
        .counter_section{
            background:url('#{$global-base-url}common/golden-line.png')
            padding: 5px;
            margin: 10px;
            border-radius: 10px;
        }
        .counter_area{
            background: var(--color-1);
            padding: 10px;
            border-radius: 10px;
        }
        .counter_area h3{
            font-size: 40px;
            color: var(--brand-color-2);
            font-weight: bolder;
        }
        .counter_area p{
            font-size: 20px;
            color: var(--brand-color-1);
        }
            .heading{
        font-size:4rem;
        font-weight: bold;
        text-transform: uppercase;
        `}
            </style>
        </>
    )
}

export default Banner
