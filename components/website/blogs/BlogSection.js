import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import BlogItem2 from './BlogItem2';
import styles from '../../../styles/BlogItem2.module.css';
import {imageKitLoader } from '@/helper/Helper';
const BlogSection = ({title,data}) => {
return (
    <>
    <div className='container'>
    <div className='row'>
      <div className='col-md-9'>
          <h2 className='title'>{title}</h2>
          <p>Stay updated with our latest blog posts, where we share insightful articles on real estate trends, investment strategies, and expert tips to help you make informed decisions in the dynamic market, empowering you to stay ahead in your property journey.</p>
        </div>
        <div className='col-md-3 text-end'>
          <Link href='/blogs' className='btns btn-orange'>View More →</Link>
        </div>
        </div>
      <div className="row my-5">
      {data && data[0] && (
  <div className='col-md-6 single_card'>
      <div className={`${styles.single_card} mb-3`}>
      <Link href={`/blogs/${data[0].slug}`} ><div className={styles.image_container}>
          <Image loader={imageKitLoader} src={`${data[0].thumbnail}`} alt={data[0].title} width={300} height={300} className={styles.img_fluid} loading='lazy' />
          <div className={styles.caption}>
            <h4 className={styles.caption_text}>{data[0].title}</h4>
          </div>
          <div className={styles.overlay}>
            <div className={styles.overlay_content}>
              <h4>{data[0].title}</h4>
              <p className={styles.text}>{data[0].shortDesc}</p>
              <button  className='btns btn-orange'>Read More</button>
            </div>
          </div>
        </div>
        </Link>
      </div>
  </div>
)}
 <div className='col-md-6 row'>
        {data && data.slice(1, 5)
            .map((item, index) => (
              <div className='col-md-6' key={index}>
                <BlogItem2 data={item} />
              </div>
            ))}

        </div>
      </div>
    </div>
   
    </>
  )
}

export default BlogSection
