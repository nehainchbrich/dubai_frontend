import { imageKitLoader } from '@/helper/Helper'
import Image from 'next/image'
import React from 'react'
import styles from '../../styles/landing/landing.module.css'
const Description = ({img1,img2,title,desc,keyfeature}) => {
  return (
    <>
      <div className="container">
      <div className={`${styles.portfolio_item} row my-3`}>
        <div className="col-md-7"  data-bs-toggle="modal" data-bs-target="#projectModal">
          <Image loader={imageKitLoader} src={img1} className="img-fluid" alt={title} width={100} height={100}/>
        </div>
       <div className="col-md-5">
          <h2>{title}</h2>
          <p>{desc}</p>
        <div className="text-center"><i className={`${styles.finger_clid} fa-regular fa-hand-point-right`}></i><button type="button" className="btns btn-blue" data-bs-toggle="modal" data-bs-target="#projectModal">Download Brochures →</button></div>
       </div>
    </div>
    <div className={`${styles.portfolio_item} row my-3`}>
          <div className="col-md-5">
            <h2>Key Highlights:</h2>
            <div dangerouslySetInnerHTML={{ __html: keyfeature }} />
            <div className="text-center">
              <i className={`${styles.finger_clid} fa-regular fa-hand-point-right`}></i><button type="button" className="btns btn-blue" data-bs-toggle="modal" data-bs-target="#projectModal">Learn More →</button>
            </div>
          </div>
          <div className="col-md-7"  data-bs-toggle="modal" data-bs-target="#projectModal">
            <Image loader={imageKitLoader} src={img2} className="img-fluid" alt="Project Title" width={100} height={100}/>
          </div>
    </div>  
    </div>
    </>
  )
}

export default Description
