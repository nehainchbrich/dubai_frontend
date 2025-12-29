import { imageKitLoader } from '@/helper/Helper'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/landing/landing.module.css'
const Expo = () => {
  return (
    <>
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className={styles.ads_box}>
            <div className={styles.ads_image}>
                <Link href="/hyderabad-expo-2024-by-inchbrick">
                    <Image loader={imageKitLoader} src="/meta/1718115862575_38a1ee46-9118-4f07-950a-6f6e596569d6.jpg" width={100} height={100} alt="Ad Image" className="img-fluid"/>
                </Link>
            </div>
            <div className={styles.ad_content}>
                <h3>
                    <Link href="/hyderabad-expo-2024-by-inchbrick">
                      Dubai's Exclusive Real Estate Expo Returns to Hyderabad with New Heights.
                    </Link>
                </h3>
                <p>
                    <Link href="/hyderabad-expo-2024-by-inchbrick">
                      Inch & Brick Realty, a premiere Dubai-based real estate company is happy to announce their return to Hyderabad with an even bigger and better Dubai Property Expo July 6th-7th 2024!
                    </Link>
                </p><br/>
                <p><Link href="/expo-invitation" className="btns btn-blue" type="button">Book VIP Pass</Link></p>
            </div>
        </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Expo
