import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import {imageKitLoader } from '@/helper/Helper';
import styles from '../../../styles/BlogItem2.module.css';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const BlogItem2 = ({ data}) => {
return (
        <>
            <div className={`${styles.blog_card} mb-3`}>
                <Link href={`/blogs/${data.slug}`}> 
                <div className={styles.image_container}>
                <Image loader={imageKitLoader} src={`${data.thumbnail}`} alt={data.title} width={100} height={100} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} placeholder='blur'  blurDataURL={staticBlurDataUrl()} priority={true} className={styles.img_fluid}/>
                    <div className={styles.caption}>
                        <h4 className={styles.caption_text}>{data.title.length > 80 ? `${data.title.substring(0, 50)}...` : data.title}</h4>
                    </div>
                    <div className={styles.overlay}>
                        <div className={styles.overlay_content}>
                            {/* <h4 className={styles.title}>{data.title.length > 80 ? `${data.title.substring(0, 50)}...` : data.title}</h4> */}
                            {/* <button className='btns btn-orange view-blog'></button> */}
                        </div>
                    </div>
                </div>
                    </Link>
            </div>
        </>
    )
}
export default BlogItem2