import React from 'react'
import LocationCard from '../common/LocationCard'
import Link from 'next/link'
import style from '../../../styles/Prominent.module.css'

const ProminentLocalities = ({ data, heading }) => {
  return (
    <section className={style.prominentArea}>
      <div className='container'>
        <div className={style.sectionHeader}>
          <div className={style.watermark}>Localities</div>
          <h2 className={style.titleMain}>
            Prominent <span>Localities</span>
          </h2>
          <p className={style.subTitle}>
            Explore the most sought-after neighborhoods in Dubai.
          </p>
        </div>

        <div className={style.prominentLoc}>
          {data && data.map((item, index) => (
            <div key={index} className={style.card_wrapper}>
              <LocationCard item={item} />
            </div>
          ))}
        </div>

        <div className='text-center mt-5'>
          <Link href='/location-in-dubai' className={style.viewAllBtn}>
            View All Locations <i className="fas fa-arrow-right ms-2"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default ProminentLocalities
