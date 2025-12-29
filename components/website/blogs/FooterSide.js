import React from 'react'
import LatestBlog from './LatestBlog'
import Link from 'next/link'
import styles from '../../../styles/BlogRight.module.css';
import LatestProperty from '../property/LatestProperty'
import Image from 'next/image';
import { imageKitLoader } from '@/helper/Helper';

const FooterSide = ({category,tags,latestBlog}) => {
  return (
    <>
     {latestBlog && (
            <div className='my-1 position-sticky'>
             <div className={`${styles.related_property} shadow-sm relate-pro`}>
             {latestBlog.map((item,i)=>(
                    <Link href={`/blogs/${item.slug}`} key={i} className={styles.color_white}>
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
     <style jsx>
        
        {
           ` .relate-pro {
                 height:16rem;  
            }
              
            `
        }
        
     </style>
   </>
  )
}

export default FooterSide
