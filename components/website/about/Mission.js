import React from 'react'
import styles from '../../../styles/Mission.module.css';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
const Mission = ({heading}) => {
  return (
    <>
       <div className={styles.mission}>
       <div className="container my-5">
        <div className="row">
            <div className="col-md-6">
              <Image loader={imageKitLoader} src={`/common/about_mission.png`} alt='inchbrick' className='img-fluid' quality={50} width={600} height={700}/>
            </div>
            <div className="col-md-6">
              <div dangerouslySetInnerHTML={{ __html: heading }} />
            </div>
        </div>
        </div>
       </div>
    </>
  )
}

export default Mission
