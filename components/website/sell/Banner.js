import Image from 'next/image'
import React from 'react'
import styles from '../../../styles/SellBanner.module.css';
import Link from 'next/link';
const Banner = () => {
  return (
    <>
    <div className={styles.banner}>
        <Image
          src={`${process.env.API_URL}/uploads/common/common-banner.jpg`}
          className={styles.img_fluid}
          layout="fill"
          objectFit="cover"
          alt='INCH & BRICK'
        />
        <div className={styles.overlay}></div>
        <div className={styles.banner_content}>
          <h1 className={styles.banner_heading}>Welcome to our Website</h1>
          <p className={styles.banner_description}>Explore our latest products and services</p>
          <Link href='/' className="btns btn-blue">APPly Now →</Link>
        </div>
      </div>
    </>
  )
}

export default Banner
