import User from '@/pages/layouts/user'
import React from 'react'
import Image from 'next/image'
import styles from '../../../styles/user/Dashboard.module.css'
import Link from 'next/link'
import WelcomeBar from '@/components/user/WelcomeBar'
const Index = () => {
  return (
    <>
    <WelcomeBar/>
      <div className='container'>
        <div className='row'>
           <div className='col-md-6 m-auto row'>
           <div className='col-md-6 my-3'>
                <div className={styles.card}>
                    <Image src={`${process.env.API_URL}/common/personal.svg`} alt='inchbrick' width={200} height={200} loading='lazy' className='card_box_image'/>
                    <h4 className='text-center'><Link href='/user/profile'>Profile →</Link></h4>
                </div>
            </div>
            <div className='col-md-6 my-3'>
                <div className={styles.card}>
                    <Image src={`${process.env.API_URL}/common/refer.svg`} alt='inchbrick' width={200} height={200} loading='lazy' className='card_box_image'/>
                    <h4 className='text-center'><Link href='/user/refer-earn'>Refer & Earn →</Link></h4>
                </div>
            </div>
            <div className='col-md-6 my-3'>
                <div className={styles.card}>
                    <Image src={`${process.env.API_URL}/common/cart.svg`} alt='inchbrick' width={200} height={200} loading='lazy' className='card_box_image'/>
                    <h4 className='text-center'><Link href='/property-compare'>Compare Properties →</Link></h4>
                </div>
            </div>
            <div className='col-md-6 my-3'>
                <div className={styles.card}>
                    <Image src={`${process.env.API_URL}/common/document.svg`} alt='inchbrick' width={200} height={200} loading='lazy' className='card_box_image'/>
                    <h4 className='text-center'><Link href='/user/documents'>Documents →</Link></h4>
                </div>
            </div>
           </div>
        </div>
    </div>
    </>
  )
}

export default Index
Index.getLayout = function getLayout(page) {
    return (<User>{page}</User>)
  }