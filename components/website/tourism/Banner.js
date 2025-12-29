import React from 'react'
import styles from '../../../styles/TourismBanner.module.css';
const Banner = () => {
  return (
    <>
    <div className={styles.banner}>
    <video autoPlay muted={true} loop controls={false}>
        <source src={`${process.env.API_URL}/common/tourism.mp4`} type="video/mp4"/>
    </video>

      </div>
    </>
  )
}

export default Banner
