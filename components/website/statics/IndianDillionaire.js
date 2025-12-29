import Image from 'next/image'
import React from 'react'
const IndianDillionaire = () => {
  return (
    <>
            <div className='container'>
                <h4 className='text-center section-title'>INDIAN BILLIONAIRE - MUKESH AMBANI SEALED A DEAL AGAIN IN DUBAI REAL ESTATE</h4>
            <div className='row my-5'>
                <div className='col-md-5 billionaire'>
                    <p>The past few years have seen a rise in the number of records being set for real estate sales.</p>
                    <p>In March 2022, Indian billionaire Mukesh Ambani purchased a stunning mansion on Palm Jumeirah for $80 million. But he wasn’t finished there, because in October of the same year the tycoon sealed a deal for another epic villa on the palm-shaped island. This time it was a 10- bedroom, 33,000 square foot, custom-built masterpiece for which he paid a whopping $163 million, making mere double-digit million prices for prime properties in Dubai seem almost inconsequential.</p>
                </div>
                <div className='col-md-7'>
                  <Image src={`${process.env.API_URL}/common/ambani.webp`} width={1200} height={800} alt='INDIAN BILLIONAIRE' className='img-fluid'/>
                </div>
            </div>
            </div>
            <style>
            {`
            .section-title{
              font-size: 25px;
              font-weight: bolder;
              border: 4px solid;
              border-image: var(--two-side-border);
              padding: 10px;
             }
            .billionaire p{
              font-size: 24px;
              margin-top: 25px;
              line-height: 1.5;
            }
            `}
            </style>
    </>
  )
}

export default IndianDillionaire
