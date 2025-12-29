import { imageKitLoader } from '@/helper/Helper'
import Image from 'next/image'
import React from 'react'
import styles from '../../styles/landing/landing.module.css'
const Payment = ({payment}) => {
  return (
    <>
      <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
            <h2 className='title_about'>Payment Plan</h2>
        </div>
          <div className={`${styles.payment} col-md-8 m-auto`}  data-bs-toggle="modal" data-bs-target="#projectModal">
                <Image loader={imageKitLoader} src={payment} className="img-fluid" alt="Payment Plan" width={100} height={100}/> 
           </div>
      </div>
    </div>
    <style jsx>
      {`
      .title_about {
            font-size: 3rem;
            margin: 2rem;
            text-transform: capitalize;
            font-weight: bold;
        }

    @media (max-width: 550px) {
     
      .title_about {
        font-size: 1.5rem;
        margin: 1rem;
      }
    }
      `}
      </style>
    </>
  )
}

export default Payment
