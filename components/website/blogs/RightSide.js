import React from 'react'
import LatestBlog from './LatestBlog'
import Link from 'next/link'
import styles from '../../../styles/BlogRight.module.css';
import LatestProperty from '../property/LatestProperty'
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';

const RightSide = ({category,tags,latestBlog}) => {
  return (
    <>
     {latestBlog && (
            <div className='my-1 position-sticky'>
            <h4>Latest Blog</h4>
             <div className={`${styles.related_property} shadow-sm`}>
             {latestBlog.map((item,i)=>(
                    <Link href={`/blogs/${item.slug}`} key={i}>
             <div className={`${styles.list_item} shadow-sm`}>
                   <Image loader={imageKitLoader} src={`${item.thumbnail}`} alt={item.title} className="img-fluid" width={100} height={200}/>
                   <div className={styles.content}>
                       <div className={styles.title}>{item.title}</div>
                       <small>{item.author}</small>
                   </div>
               </div>
                   </Link>
               ))}
            </div>
            </div>
        )}
      <LatestBlog/>
      <LatestProperty/>
      <div className={styles.tag_card}>
          <div className={styles.card_content}>
              <h4 className={`${styles.card_title} mb-3`}>Top Categories</h4>
              {category && category.map((item,index)=>(
                <p key={index}><Link href={`/blog-category/${item.slug}`}>{item.title}</Link></p>
              ))}
          </div>
        </div>
        <div className={styles.tag_card}>
            <div className={styles.card_content}>
                <h4 className={`${styles.card_title} mb-3`}>Tags</h4>
                {tags && tags.map((item, index)=>(
                  <p key={index}><Link href={`/blog-tag/${item.slug}`}>{item.title}</Link></p>
            ))}
            </div>
        </div>
   </>
  )
}

export default RightSide
