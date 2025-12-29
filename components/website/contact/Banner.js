import React from 'react'
import styles from '../../../styles/ContactBanner.module.css';
import Image from 'next/image';
const Banner = ({title}) => {
  return (
    <>
       <div className={styles.banner_container}>
        <Image src={`${process.env.API_URL}/common/contact-banner.jpg`} className='img-fluid' width={1200} height={400} alt='INCH & BRICK'/>
      <div className={styles.banner_overlay}>
          <h1 className='wow fadeInDownBig'>{title}</h1>
          <p className='wow fadeInUpBig'>For more information about our services, get in touch with our expert consultants</p>
    </div>
    </div>
    </>
  )
}

export default Banner
