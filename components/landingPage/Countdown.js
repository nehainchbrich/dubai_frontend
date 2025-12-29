import { useState, useEffect } from 'react';
import { calculateTimeRemaining } from '@/helper/Helper';
import Link from 'next/link';
const Countdown = () => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    
      useEffect(() => {
        const timer = setInterval(() => {
          setTimeRemaining(calculateTimeRemaining('2024-07-06T10:00:00'));
        }, 1000);
    
        return () => clearInterval(timer);
      }, []);
  return (
    <>
    <div className='container text-center mb-4'>
          <h2 className='heading'>EXPERIENCE LUXURY TOWNHOUSES BY EMAAR AT OUR GRAND EXPO</h2>
    </div>
      <div className='container count_box'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h2 className='title_about'>The Countdown To The Most Exciting Real Estate Expo Of 2024 Is On</h2>
                <p>{`Just a few days left to grab VIP access & unlock exclusive Dubai property deals. Don't miss your chance to snag the hottest Dubai properties and connect with the movers & shakers of Dubai's skyline.`}</p>
            </div>
        </div>
        <div className='row count_card my-3'>
            <div className='col-md-6 mt-auto'>
              <Link href={'/expo-invitation'}>
                  <h2 className='timer'>{`${timeRemaining.days}D :`} {`${timeRemaining.hours}H :`} {`${timeRemaining.minutes}M :`} {`${timeRemaining.seconds}S`}</h2>
              </Link>
            </div>
            <div className='col-md-12 text-center my-5'>
              <Link href={'/expo-invitation'} className='btns btn-blue'>Book your Free VIP Pass →</Link>
              <Link href={'/blogs/hyderabad-real-estate-expo-2024-your-gateway-to-unparalleled-opportunities-for-end-users-and-investors-inchbrick-blog'} className='btns btn-orange' target='_blank'>Know More →</Link>
            </div>
        </div>
      </div>
      <style jsx>
      {`
      .heading{
        font-size:3.5rem;
        font-weight: bold;
        text-transform: uppercase;
      }
        .count_box{
          border: 2px solid !important;
          border-image: var(--four-side-border) !important;
        }
        .timer{
            background:var(--brand-color-1);
            font-size: 2.4rem;
            margin: 1rem;
            text-transform: capitalize;
            font-weight: bold;
            padding: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100px;
            box-shadow:var(--shadow-blue);
            border-radius:10px;
            text-shadow:4px 3px #545454;
        }
        .title_about {
            font-size: 3rem;
            margin: 2rem;
            text-transform: capitalize;
            font-weight: bold;
        }
        .count_card {
            cursor:pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
   

    @media (max-width: 550px) {
      .heading {
        font-size: 1.6rem;
      }
      .timer {
        font-size: 1.5rem;
        height: 70px;
        padding: 6px;
      }
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

export default Countdown
