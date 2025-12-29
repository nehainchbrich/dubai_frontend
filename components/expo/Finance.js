import Image from 'next/image'
import React from 'react'
import styles from "../../../styles/Banner.module.css";
import OwlCarousel from '@/components/OwlCarousel';
import BannerCard from '../home/BannerCard';
const Finance = () => {
  const options = {
    loop: true,
    nav: true,
    navText: [
      `<i class='fa fa-chevron-left ${styles.left_btn}'></i>`,
      `<i class='fa fa-chevron-right ${styles.right_btn}'></i>`
    ],
    items:1,
    dots: false,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
  };
  const images = [
    {
      thumbnail: '/common/FOR WEBSITE BANNER SIZE high capital.jpg',
      heading1:'',
      heading2:'',
      permalink:'/expo-invitation'
    },
    // {
    //   thumbnail: '/common/expo.jpg',
    //   heading1:'',
    //   heading2:'',
    //   permalink:'/expo-invitation'
    // },
    // {
    //   thumbnail: '/common/bg-home-2.jpeg',
    //   heading1:'',
    //   heading2:'',
    //   permalink:'/expo-invitation'
    // },
    // {
    //   thumbnail: '/common/bg-home-3.jpg',
    //   heading1:'',
    //   heading2:'',
    //   permalink:'/expo-invitation'
    // },
  ];
  return (
    <>
      <div className='container'>
            <div className='row'>
                <div className='col-md-12 text-center'>
                    <h2 className='title_about'>Navigating Dubai Real Estate and Finance</h2>
                  <p>{`Crafting dreams, building realities – real estate tailored for a growing India. Gain insights into Dubai real estate and all things finance right here.`}</p>
                </div>
               <div className='col-md-12 text-center'>
                <OwlCarousel className={`owl-theme ${styles.banner_owl}`} {...options}>
                {images.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <BannerCard item={item}/>
                    </div>
                ))}
                </OwlCarousel>
                </div>
            </div>
      </div>
      <style jsx>
      {
        `
        .title_about {
            font-size: 3rem;
            margin: 1rem;
            text-transform: capitalize;
            font-weight: bold;
        }
        
        `
      }
      </style>
    </>
  )
}

export default Finance
