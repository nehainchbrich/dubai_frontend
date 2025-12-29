import Image from 'next/image'
import React from 'react'
import styles from "../../../styles/Banner.module.css";
import OwlCarousel from '@/components/OwlCarousel';
import BannerCard from '../home/BannerCard';
const About = () => {
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
      thumbnail: '/common/FOR WEBSITE BANNER SIZE golden visa.jpg',
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
                    <h2 className='title_about'>Effortless Investing in Real Estate</h2>
                  <p>{`Explore seamless investment possibilities in the vibrant world of real estate. Join us at our exclusive expo in Hyderabad to unlock the key to effortless investing.`}</p>
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

export default About
