import React from 'react'
import styles from '../../../styles/Press.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { imageKitLoader } from '@/helper/Helper';
const PrCard = ({data}) => {
  return (
    <>
     <div className={styles.pressSection}>
      <a href={data.slug ? data.slug : '#'} target='_blank'>
        <div className={styles.logo_section}>
          <Image loader={imageKitLoader} src={data.logo} width={100} height={100} alt={data.title} quality={50} sizes='(max-width: 426px) 40vw, 426px'/>
        </div>
      </a>
      <div className={styles.content}>
        <a href={data.slug ? data.slug : '#'} target='_blank'>
          <h4>{data.title}</h4>
        </a>
      </div>
    </div>
    </>
  )
}

export default PrCard
