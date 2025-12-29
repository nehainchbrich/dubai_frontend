import Image from 'next/image'
import React from 'react'
import styles from '../../styles/landing/landing.module.css'
import Link from 'next/link'
import { imageKitLoader } from '@/helper/Helper'
const DeveloperProject = ({logo,title,tagline}) => {
  return (
    <>
      <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h1>{title}</h1>
                <p>{tagline}</p>
            </div>
            <div className="col-md-6 mb-3">
           <div className={`${styles.brand_logo} ${styles.inch}`}>
            <Link href="/hyderabad-expo-2024-by-inchbrick">
                <Image loader={imageKitLoader} src={"/nautica/blk-inchbrick.png"} alt="Inchbrick" width={100} height={100} className="img-fluid"/>
            </Link>
           </div>
        </div>
        <div className="col-md-6 mb-3">
            <div className={`${styles.brand_logo} ${styles.inch}`}>
                <Link href="/hyderabad-expo-2024-by-inchbrick">
                    <Image loader={imageKitLoader} src={logo} alt="emaar" width={100} height={100} className="img-fluid"/>
                </Link>
            </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default DeveloperProject
