import Link from 'next/link'
import React from 'react'
import styles from '../../../styles/TourismCard.module.css';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
import { useRouter } from 'next/router';
const TourismSection = () => {
  const router = useRouter();
  return (
    <>
      <div className='container-fluid'>
      
       <div className='row'>
        <div className='col-md-9 text-center' onClick={() => router.push(`/tourism-place-in-dubai`)}></div>
        <div className='col-md-3 row'>
          <Link href={`/blogs/amazing-facts-about-burj-khalifa-overview`}>
                <div className='col-md-12 wow fadeInLeftBig'>
                <div className={`${styles.blog_card} mb-0`}>
                <div className={styles.image_container}>
                    <Image loader={imageKitLoader} src={`/common/4.jpg`} alt={'Amazing facts about burj khalifa'} quality={50} sizes='(max-width: 426px) 40vw, 426px' width={100} height={100} className={`${styles.img_fluid}`} />
                </div>
            </div>
            </div>
            </Link>
            <Link href={`/blogs/burj-khalifa-and-dubai-a-dreamy-experience`}>
            <div className='col-md-12 wow fadeInLeftBig'>
                <div className={`${styles.blog_card} mb-0`}>
                <div className={styles.image_container}>
                    <Image loader={imageKitLoader} src={`/common/33.jpg`} alt={'Burj khalifa and dubai a dreamy experience'} quality={50} sizes='(max-width: 426px) 40vw, 426px' width={100} height={100} className={`${styles.img_fluid}`}/>
                </div>
            </div>
            </div>
            </Link>
            <Link href={`/blogs/from-summit-ground-the-journey-through-burj-khalifa-lower-section`}>
            <div className='col-md-12 wow fadeInLeftBig'>
                <div className={`${styles.blog_card} mb-3`}>
                <div className={styles.image_container}>
                    <Image loader={imageKitLoader} src={`/common/2.jpg`} alt={'from summit ground the journey through burj khalifa lower section'} quality={50} sizes='(max-width: 426px) 40vw, 426px' width={100} height={100}  className={`${styles.img_fluid}`}  />
                </div>
            </div>
            </div>
            </Link>
        </div>
        </div>
      </div>
    </>
  )
}

export default TourismSection
