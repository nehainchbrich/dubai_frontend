import React from 'react'
import styles from '../../../styles/Leader.module.css';
import Image from 'next/image';
import Link from 'next/link';
import {imageKitLoader } from '@/helper/Helper';
const Leadership = () => {
  return (
    <>
       <div className={styles.leadership}>
       <Image loader={imageKitLoader} src={`/common/learder-bg.png`} alt='inchbrick' className='img-fluid' quality={50} width={600} height={700}/>
    <div className={styles.banner_overlay}>
        <h2>LEADERSHIP</h2>
        {/* <Link href={`${process.env.API_URL}/common/inch-brick-brochure.pdf`} download target='_blank' className='btns btn-orange'>Download the company profile →</Link> */}
    </div>
    </div>
    </>
  )
}

export default Leadership
