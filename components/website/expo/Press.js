import { imageKitLoader } from '@/helper/Helper'
import Image from 'next/image'
import React from 'react'
import styles from '../../../styles/ExpoPress.module.css'
import Link from 'next/link'
const Press = () => {
  return (
    <>
      <div className='container'>
        <div className='row'>
            <div className='col-md-6'>
              <div className={styles.press_img}>
                <Image loader={imageKitLoader} src={'/expo/press.avif'} alt='Last Expo Press Release' width={600} height={500}/>
              </div>
            </div>
            <div className='col-md-6'>
               <div className={styles.press_content}>
                <h4>Inch & Brick Realty Makes Headlines</h4>
                <p>{`Inch & brick Realty make the headlines after a highly successful expo back in January.`}</p>
                <p>{`some of the most well-known news media platforms like the Print write in golden words about our expo in Hyderabad, and this was just the trailer, this time we are planning to be bigger & better than ever before.`}</p>
                <p>{`So, there is no chance for you to miss this golden opportunity, enroll now & grab it.`}</p>
                <Link href={'/expo-invitation'} className='btns btn-orange'>Book Your Free VIP Pass →</Link>
               </div>
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
        `}
      </style>
    </>
  )
}

export default Press
