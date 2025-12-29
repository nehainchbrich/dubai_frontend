import React, { useState, useEffect } from 'react'
import styles from '../../../styles/Prominent.module.css';
import Image from 'next/image';
import { StarRating, imageKitLoader } from '@/helper/Helper';
import Link from 'next/link';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';

const LocationCard = ({ item }) => {

  return (
    <div className={styles.card_wrapper}>
      <Link href={`/location-in-dubai/${item.slug}`} passHref legacyBehavior>
        <a className={styles.card}>
          <div className={styles.card_img_wrapper}>
            <Image
              loader={imageKitLoader}
              src={`${item.thumbnail}`}
              alt={item.name}
              fill
              quality={60}
              placeholder="blur"
              blurDataURL={staticBlurDataUrl()}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              className={styles.card_img}
            />
          </div>

          <div className={styles.card_overlay}></div>

          <div className={styles.card_content}>
            <div className={styles.card_category}>{item.country === 'UAE' ? 'Dubai' : item.country} • {item.state}</div>
            <h3 className={styles.card_title}>{item.name}</h3>

            <div className={styles.card_rating}>
              <span>{Number(item.rating) > 0 ? Number(item.rating).toFixed(1) : 'New'}</span>
              <span>{StarRating(item.rating)}</span>
            </div>

            <p className={styles.card_text}>
              {item.shortDesc && item.shortDesc.length > 80 ? item.shortDesc.substring(0, 80) + '...' : item.shortDesc}
            </p>

            <span className={styles.card_btn}>
              Discover Location <i className={`fas fa-arrow-right ${styles.arrow_icon}`}></i>
            </span>
          </div>
        </a>
      </Link>
    </div>
  )
}

export default LocationCard
