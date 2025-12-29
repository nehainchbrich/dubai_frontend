import React from 'react'
import styles from '../../../styles/Approch.module.css';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
const Approach = ({heading}) => {
  return (
    <>
    <div className={styles.approch}>
    <Image loader={imageKitLoader} src={`/common/apporach-section.jpg`} alt='inchbrick' className='img-fluid' quality={50} width={600} height={700}/>
    <div className={styles.banner_overlay}>
      <div dangerouslySetInnerHTML={{ __html: heading }} />
    </div>
    </div>
    </>
  )
}

export default Approach
