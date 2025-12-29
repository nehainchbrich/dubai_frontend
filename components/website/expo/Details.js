import Link from 'next/link'
import React from 'react'

const Details = () => {
  return (
    <>
      <div className='container'>
            <div className='row'>
                <div className='col-md-12 text-center'>
                    <h2 className='title_about'>{`Location, Time, & Venue for Grand Hyderabad Real Estate Expo`}</h2>
                    <p >{`Mark your calendars for July 6th & 7th at The Westin Hyderabad, Mindspace, where you can explore the latest trends in the Dubai real estate market, network with Dubai’s top developers, and discover groundbreaking real estate opportunities.`}</p>
                    
                </div>
                <div className='col-md-3 mb-3'>
                <Link href={'/expo-invitation'}>
                    <div className='details_card card_1'>
                        <h4 className='text-center'><span className='fa-solid fa-calendar-days'> </span> <br/>06th July 2024</h4>
                        <h4 className='text-center'><span className='fa-solid fa-clock'> </span> <br/>10:00 AM - 10:00 PM</h4>
                    </div>
                    </Link>
                </div>
                <div className='col-md-3 mb-3'>
                <Link  href={'/expo-invitation'}>
                    <div className='details_card card_2'>
                    <h4 className='text-center'><span className='fa-solid fa-calendar-days'> </span> <br/> 07th July 2024</h4>
                        <h4 className='text-center'><span className='fa-solid fa-clock'> </span> <br/>10:00 AM - 10:00 PM</h4>
                    </div>
                    </Link>
                </div>
                <div className='col-md-3 mb-3'>
                        <Link href={'#map-section'}>
                    <div className='details_card card_3'>
                        <h4 className='text-center'><span className='fa-solid fa-location-dot'> </span> <br/>The Westin Hyderabad Mindspace</h4>
                    </div>
                        </Link>
                </div>
                <div className='col-md-3 mb-3'>
                    <Link href={'/blogs/hyderabad-real-estate-expo-2024-your-gateway-to-unparalleled-opportunities-for-end-users-and-investors-inchbrick-blog'} target='_blank'>
                    <div className='details_card card_4'>
                        <h4 className='text-center'> Know More → </h4>
                    </div>
                    </Link>
                </div>
            </div>
      </div>
      <style jsx>
      {`
        .title_about {
            font-size: 3rem;
            margin: 1rem;
            text-transform: capitalize;
            font-weight: bold;
        }
        .about_p{font-size: 1.5rem;
            font-weight: bold;
        }
        .card_3::before{
            background: var(--color-1) url(https://cdn.inchbrick.com/common/westin.jpeg);
            opacity: .3;
        }
        .card_1::before{
            background: var(--color-1) url(https://cdn.inchbrick.com/common/calendar-1.jpg);
            opacity: .3;
        }
        .card_2::before{
            background:var(--color-1) url(https://cdn.inchbrick.com/common/calendar-2.jpg);
            opacity: .3;
        }
        .details_card {
            border-radius: 10px;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 200px;
            background-size: cover;
            cursor:pointer;
            position:relative;
        }
        .details_card::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -2;
            top: 0;
            left: 0;
            border-radius: 10px;
            background-size: cover;
        }
        .card_4 h4:hover{
            color:var(--brand-color-2);
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

export default Details
