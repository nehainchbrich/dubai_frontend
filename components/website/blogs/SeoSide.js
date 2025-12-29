import React from 'react'
import LatestBlog from './LatestBlog'
import Link from 'next/link'
import styles from '../../../styles/BlogRight.module.css';
import LatestProperty from '../property/LatestProperty'
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';

const SeoSide = ({category,tags,latestBlog}) => {
  return (
    <>
   
        <div className={styles.tag_card}>
            <div className={styles.card_content}>
                {tags && tags.map((item, index)=>(
                  <p key={index}><Link href={`/blog-tag/${item.slug}`}>{item.title}</Link></p>
            ))}
            </div>
        </div>
   </>
  )
}

export default SeoSide
