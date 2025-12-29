import Image from 'next/image'
import React from 'react'
import {imageKitLoader } from '@/helper/Helper';
import Link from 'next/link';
const Invitation = () => {
  return (
    <>
      <div className='container invitaion_card'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h2 className='title_about'>Personal Invitation & Free VIP Pass for Exclusive Perks</h2>
                <p>{`Secure your free VIP pass for an evening among famous Dubai developers &  Real Estate Titans`}</p>
            </div>
            <div className='col-md-5'>
              <Link href={'/expo-invitation'} >
                  <Image loader={imageKitLoader} src={'/common/INVETATION CARD wesite.jpg'} width={500} height={600} alt='Invitation Card' className='img-fluid'/>
                </Link>
            </div>
            <div className='col-md-7 my-5'>
              <Link href={'/expo-invitation'} >
                <p><Image loader={imageKitLoader} src={'/common/sample-pass.jpg'} width={800} height={600} alt='Invitation Card' className='img-fluid'/></p>
              </Link>
              <div className='text-center'>
                  <Link href={'/expo-invitation'}  className='btns btn-blue'>Book Your Free VIP Pass →</Link>
                  <Link href={'/blogs/hyderabad-real-estate-expo-2024-your-gateway-to-unparalleled-opportunities-for-end-users-and-investors-inchbrick-blog'} target='_blank' className='btns btn-orange'>Know More →</Link>
              </div>
            </div>
        </div>
      </div>
      <style jsx>
      {`
      .invitaion_card{
        border: 2px solid !important;
        border-image: var(--four-side-border) !important;
        padding:10px;
      }
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

export default Invitation
