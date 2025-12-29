import React from 'react'
import styles from '../../../styles/BlogCard.module.css'
import Link from 'next/link';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const BlogItems = ({data}) => {
  return (
    <>
      <div className={styles.blog_tile}>
      <Link href={`/blogs/${data.slug}`}>
          <div className={styles.blog_img}>
            <Image loader={imageKitLoader} src={`${data.thumbnail}`} alt={data.title} width={100} height={100} placeholder="blur" blurDataURL={staticBlurDataUrl()} quality={50} sizes='(max-width: 426px) 40vw, 426px'/>
          </div>
          <div className={styles.blog_content}>
            <h3 className={styles.blog_title}>{data.title.length > 80 ? `${data.title.substring(0, 50)}...` : data.title}</h3>
            <p className={styles.blog_excerpt}>{data.shortDesc}...<small>[Read more]</small></p>
          </div>
          </Link>
        </div>
    </>
  )
}

export default BlogItems
