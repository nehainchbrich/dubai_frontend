import OwlCarousel from '@/components/OwlCarousel';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import styles from '../../styles/Builder.module.css'
import {imageKitLoader, ImagePath} from '@/helper/Helper';
const Developer = ({data,section}) => {
const description = ImagePath(section?.sectionSubHeading);
    const options = {
        loop: true,
        margin:20,
        nav: false,
        responsive: {
            0: {
              items: 1
            },
            600: {
              items: 4
            },
            1000: {
              items: 4
            }
          },
        dots: false,
        autoplay: true,
      };
  return (
    <>
      <div className='container'>
        <div className='row'>
            <div className='col-md-12 text-center'>
            <h2 className='title_about'>{section?.sectionHeading}</h2>
            <div className='mb-3' dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
            <OwlCarousel className="owl-theme" {...options}>
            {data && data.map((item, index) => (
                <div className={`col-md-12 ${styles.developer}`} key={index}>
                <Link href={`/top-real-estate-developer-in-dubai/${item.slug}`}><Image loader={imageKitLoader} className="mx-auto" src={`${item.logo}`} alt={item.name} width={500} height={500}/></Link>
                </div>
                ))}
            </OwlCarousel>
            <div className='col-md-12 text-center my-3'>
            <Link href={'/expo-invitation'} className='btns btn-orange'>Book Your Free VIP Pass →</Link>
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

export default Developer
