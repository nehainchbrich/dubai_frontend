import { useState, useEffect } from 'react';
import { calculateTimeRemaining, eventDateExtract, formatEventDatesWithSuffix, ImagePath } from '@/helper/Helper';
import Link from 'next/link';
const Countdown = ({data,section}) => {
    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());
    const description = ImagePath(section?.sectionSubHeading);
    useEffect(() => {
      if (data[0].eventDate) {
        const targetDate = eventDateExtract(data[0].eventDate); // Extract date and time
        if (targetDate) {
          const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining(targetDate));
          }, 1000);
  
          return () => clearInterval(timer); // Clean up on unmount
        }
      }
    }, [data[0].eventDate]);
  return (
    <>
    
      <div className='container count_box'>
        <div className='row'>
            <div className='col-md-12 text-center'>
                <h2 className='title_about'>{section?.sectionHeading}</h2>
               <div className='mb-3' dangerouslySetInnerHTML={{ __html: description }}></div>
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
              <Link href={`/blogs/${data[0].blog_link}`} className='btns btn-orange' target='_blank'>Know More →</Link>
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
