import React from 'react'
import styles from '../../../styles/AboutInch.module.css';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
const AboutInch = ({heading}) => {
  return (
    <>
      <div className={styles.about_inch}>
      <div className="container">
        <div className="row my-5">
            <div className="col-md-6">
              <div dangerouslySetInnerHTML={{ __html: heading }} />
            </div>
            <div className="col-md-6">
              <Image loader={imageKitLoader} src={`/common/about.jpg`} alt="Inchbrick" className='img-fluid' quality={50} width={500} height={600}/>
            </div>
        </div>
    </div>
      </div>
    </>
  )
}

export default AboutInch
