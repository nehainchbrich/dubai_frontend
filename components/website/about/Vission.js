import React from 'react'
import styles from '../../../styles/Vission.module.css';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
const Vission = ({heading}) => {
  return (
    <>
       <div className={styles.vission}>
       <div className="container">
        <div className="row my-5">
            <div className="col-md-6">
              <div dangerouslySetInnerHTML={{ __html: heading }} />
            </div>
            <div className="col-md-6">
            <Image loader={imageKitLoader} src={`/common/about_vision.png`} alt='inchbrick' className='img-fluid' quality={50} width={600} height={700}/>
            </div>
        </div>
    </div>
       </div>
    </>
  )
}

export default Vission
