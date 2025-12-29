import React from 'react';
import OwlCarousel from '../../OwlCarousel';
import Link from 'next/link';
import OffPlanCard from './OffPlanCard';
const options = {
  loop: true,
  margin: 15,
  nav: true,
  navText: ['o', 'o'],
  responsive: {
    0: {
      items: 1
    },
    600: {
      items: 3
    },
    1000: {
      items: 3
    }
  },
  dots: false,
  autoplay: false,
  autoplayTimeout: 5000,
  autoplayHoverPause: true,
};

const OffPlan = ({ data, heading }) => {
  return (
    <>
      <div className='container'>
        <div dangerouslySetInnerHTML={{ __html: heading }} />
        <div className=''>
          <Link href='/off-plan-properties-in-dubai' className='btns btn-orange'>View More →</Link>
        </div>

        <div className='row my-5'>
          <OwlCarousel className="owl-theme feature_owl" {...options}>
            {data && data.map((item, index) => (
              <OffPlanCard item={item} key={index} />
            ))}
          </OwlCarousel>
        </div>
      </div>
    </>
  )
}

export default OffPlan
