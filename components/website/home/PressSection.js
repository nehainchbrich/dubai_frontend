import React from 'react'
import PrCard from '../press-release/PrCard'
import OwlCarousel from '@/components/OwlCarousel';
const options = {
  loop: true,
  margin:20,
  nav: false,
  responsive: {
      0: {
        items: 2
      },
      600: {
        items: 4
      },
      1000: {
        items: 4
      }
    },
  dots: false,
  autoplay: true,
};
const PressSection = ({data}) => {
  return (
    <>
      <div className='container'>
        <div className='row'>
        <OwlCarousel className="owl-theme" {...options}>
          {data && data.map((data, index) => (
            <div className='col-md-12' key={index}>
                <PrCard data={data}/>
            </div>
          ))}
          </OwlCarousel>
        </div>
      </div>
    </>
  )
}

export default PressSection
