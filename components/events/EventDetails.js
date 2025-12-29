import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import styles from '../../styles/event/Event.module.css';
import { imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const EventDetails = ({data}) => {
    const activeExpos = data.filter((expo) => 
          expo.status === 'ACTIVE' || (expo.status === 'UPCOMING' && expo.default_status === 1)
      );
    const upcomingExpos = data.filter((expo) => expo.status === 'UPCOMING');
    const completedExpos = data.filter((expo) => expo.status === 'COMPLETED');
  return (
    <>
        <div className='container'>
        {activeExpos.length > 0 && (
            <div className='row my-3'>
                <h4 className='text-center'>{`Save the Date for the Grand Dubai Property Event in ${activeExpos[0].city}`}</h4>
                <div className='col-md-9 m-auto'>
                    <div className={`${styles.active_expo}`}>
                       
                       <div className='row'>
                        <div className='col-md-5'>
                        <Link href={`/events/${activeExpos[0].slug}`}>
                            <Image loader={imageKitLoader} src={`${activeExpos[0].venue_img}`} alt={activeExpos[0].city} width={100} height={200} className="img-fluid" placeholder="blur" blurDataURL={staticBlurDataUrl()} quality={50} sizes='(max-width: 426px) 40vw, 426px'/>
                            </Link>
                        </div>
                        <div className={`col-md-7 ${styles.active_expo_content}`}>
                        <h2 className='fa-solid fa-mountain-city'></h2>
                            <h3> {activeExpos[0].city}</h3>
                            {activeExpos[0]?.venue && (
                                <h4>
                                    <span className="fa-solid fa-place-of-worship"> </span> {activeExpos[0].venue}
                                </h4>
                                )}
                                {activeExpos[0]?.eventDate && (
                                <p>
                                    <span className="fa-solid fa-calendar-days"> </span> {activeExpos[0].eventDate} | 
                                    <span className="fa-solid fa-clock"> </span> 10 AM - 10 PM
                                </p>
                                )}
                            <p>{`Join our expo for real estate insights and rewards!`}</p>
                            <p><Link href={`/expo-invitation`}><span className={`${styles.btn} btns btn-orange`}>Book Free VIP Pass</span></Link> 
                            <Link href={`/events/${activeExpos[0].slug}`}><span className={`${styles.btn} btns btn-orange`}>Know More</span></Link></p>
                        </div>
                       </div>
                       
                    </div>

                </div>
            </div>
            )}
            {upcomingExpos.length > 0 && (
            <div className='row my-5'>
                <h4>{`Get Ready—The Next Dubai Property Show is Coming to Your City!`}</h4>
                {upcomingExpos && upcomingExpos.map((item, index) =>(
                <div className={`col-lg-3 col-md-4 col-sm-6 mb-2`} key={index}>
                    <div className={`${styles.upcoming_expo}`}>
                    <h2 className='fa-solid fa-mountain-city'></h2>
                    <h4>{item.city}</h4>
                    <p><Link href={`/blogs/${item.blog_link}`}><span className={`${styles.btn}`}>Know More</span></Link></p>
                    </div>
                </div>
                ))}
            </div>
            )}
            {completedExpos.length > 0 && (
            <div className='row my-5'>
                    <h4>{`Our Epic Dubai Property Expo in ${[...new Set(completedExpos.map(expo => expo.city))].join(' & ')} Was a Hit—Now It’s Your City’s Turn!`}</h4>
               {completedExpos && completedExpos.map((item, index) =>(
                    <div className='col-md-6 mb-3' key={index}>
                    <div className={`${styles.completed_expo}`}>
                    <div className='row'>
                    <div className='col-md-5'>
                    <Link href={`/events/${item.slug}`}>
                        <Image loader={imageKitLoader} src={`${item.venue_img}`} alt={item.city} width={100} height={200} className="img-fluid" placeholder="blur" blurDataURL={staticBlurDataUrl()} quality={50} sizes='(max-width: 426px) 40vw, 426px'/>
                        </Link>
                    </div>
                    <div className={`col-md-7 ${styles.completed_expo_content}`}>
                    <h2 className='fa-solid fa-mountain-city'></h2>
                        <h3> {item.city}</h3>
                        <h4><span className='fa-solid fa-place-of-worship'> </span> {item.venue}</h4>
                        <p><span className='fa-solid fa-calendar-days'> </span> {item.eventDate}</p>
                        <p> <Link href={`/events/${item.slug}`}><span className={`${styles.btn}`}>Know More</span></Link></p>
                    </div>
                    </div>
                    
                </div>
                    </div>
                ))}
                
            </div>
            )}
        </div>
    </>
  )
}

export default EventDetails
