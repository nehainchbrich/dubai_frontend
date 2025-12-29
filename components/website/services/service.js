
import React from 'react'
import styles from "../../../styles/Service.module.css";
import Image from "next/image";
import Link from "next/link";
import { imageKitLoader } from '@/helper/Helper';
const MemberProcess = ({heading}) => {
  const processCardsData = [
    {
      img: `/common/service/buy.webp`,
      title: 'BUY',
      desc: 'Experience the ultimate luxury of owning a home with Inch & Brick in the vibrant city of Dubai. Our company offers an extensive collection of exquisite properties that cater to every taste and requirement. Whether you seek sleek modern properties -  Dubai 1, 2, 3, 4 bedroom apartment, flat , villa, townhouse, Duplex for sale property in Dubai with stunning skyline views, a lavish buy Dubai  villa nestled in a tranquil community, or a waterfront residence with breathtaking panoramas, we have the perfect home waiting for you.',
      slug:'/buy-property-in-dubai',
      alt:"Buy Property in dubai"
    },
    {
      img: `/common/service/rent.webp`,
      title: 'RENT',
      desc: 'Experience seamless rent property  in Dubai through Inch & Brick . With an extensive portfolio of premium rental properties, we offer a wide range of options to match your preferences. Our dedicated team ensures a smooth process, guiding you every step of the way. Find your perfect home and enjoy the convenience and comfort of renting through us in vibrant Dubai.',
      slug:'/rent-properties-in-dubai',
      alt:"cheapest Property in dubai"
    },
    {
      img: `/common/service/sell.webp`,
      title: 'SELL',
      desc: "Experience the utmost satisfaction of selling your home in Dubai through us . With our unparalleled expertise and market knowledge, we provide a comprehensive approach to ensure a seamless and successful sales process. From strategic pricing and targeted marketing to negotiating the best deals, our dedicated team is committed to maximising the value of your property Dubai. Trust us to attract qualified buyers, showcase your home's unique features.",
      slug:'/sell-property-in-dubai',
      alt:"best company in dubai"
    },
  ];
  return (
    <>
      <div className={styles.mbody}>
        <div className="container">
        <div className="py-5">
        <div dangerouslySetInnerHTML={{ __html: heading }} />
        </div>
              <div className={`${styles.mcontainer} row py-3`}>
                  
                  {processCardsData.map((card, index) => (
                  <div className='col-md-4 text-center mb-5' key={index}>
                    <div className={styles.mCard}>
                      <div className={styles.imgBx}>
                      <Link href={card.slug}><Image loader={imageKitLoader} src={card.img} alt={card.alt} layout='fill' sizes="(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw" quality={60} priority={true}/></Link>
                      </div>
                      <div className={styles.content}>
                      <Link href={card.slug}>
                          <h3><b>{card.title}</b></h3>
                          <p>{card.desc}</p>
                        </Link>
                        <a href="#" data-bs-toggle="modal" data-bs-target="#triggerFrm">
                          <p className={`btns btn-orange`}>Enquery Now →</p>
                        </a>
                      </div>
                    </div>
                  </div>
                  ))}
              </div>
        </div>
      </div>
    </>
  )
}

export default MemberProcess
