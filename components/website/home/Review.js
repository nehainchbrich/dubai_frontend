import React from 'react'
import styles from '../../../styles/Review.module.css'
import OwlCarousel from '@/components/OwlCarousel';
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const Review = () => {
  const options = {loop: true,margin:15,nav: false,responsive: {0: {items: 1}},dots: true,autoplay: true,};
const items = [
    {
      image:`/admin-register/profile.png`,
      name: "Debashis Sinha",
      rating:5,
      company:'New Delhi,India',
      review:"My experience with this company was really great. Excellent knowledge of the market, and extremely good customer service. The team is very efficient and has a thorough knowledge of the market."
    },
    {
        image:`/admin-register/profile.png`,
        name: "Bianca Steiner",
        rating:5,
        company:'New Delhi,India',
        review:"We are very satisfied with the customer service of Inch and Brick. Pratyush showed us several projects before we decided. Overall our real estate journey was really smooth."
      },
      {
        image:`/admin-register/profile.png`,
        name: "Mahaz Ali",
        rating:5,
        company:'Pune,India',
        review:"Thank you for the good service I received from Inch & Brick Realty. They are certainly the best in Dubai and far better than their competitors. They offer reasonable property prices and are honest and sincere. The client service was excellent. Many thanks to the management of Inch & Brick Realty for helping me and recommending a good realtor."
      },
      {
        image:`/admin-register/profile.png`,
        name: "Ujjwal walia",
        rating:5,
        company:'Gurgaon,India',
        review:"Inch & Brick Realty provided me with a wonderful experience in buying property in Dubai. Mr. Saurabh arora was very helpful throughout the process of buying my dream home in Dubai. Thanks to the organization and the Mr arora who worked tirelessly with us, the entire process took much less time than we expected. Keep up the good work, Inch & brick Realty, and thanks again!"
      },
      {
        image:`/admin-register/profile.png`,
        name: "Sanchit Garg",
        rating:5,
        company:'Punjab,India',
        review:"The most customer oriented real estate agency in Dubai. Very attentive and caring for what we were looking for. The team at Inch & Brick Realty understood our needs directly and through your vast network found something perfect for us even before it came on the market! As a landlord, well, I can say that excellent service!"
      },
   
  ];
  return (
    <>
      <div className={styles.reviewSection}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-12'>
            <OwlCarousel className="owl-theme" {...options}>
            {items.map((item, index) => (
              <div className={styles.reviewCard} key={index}>
                <div className={styles.content}>
                  <p>{`"${item.review}"`}</p>
                </div>
                {item.image && 
                <div className={styles.img_box}>
                  <Image loader={imageKitLoader} src={`${item.image}`} alt={item.name} title={item.name} width={100} height={100} quality={50}  placeholder="blur" blurDataURL={staticBlurDataUrl()} sizes='(max-width: 426px) 40vw, 426px' className='img-fluid'/>
                </div>}
                <div className={styles.username}><h4>{item.name}</h4></div>
              </div>
             ))}
            </OwlCarousel>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Review
