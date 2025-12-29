import Link from 'next/link';
import React from 'react'
import styles from "../../../styles/PropertyType.module.css";
import Image from 'next/image';
import { useRouter } from 'next/router';
import { imageKitLoader, shortDesc } from '@/helper/Helper';
const PTypeCard = ({data}) => {
  const description = shortDesc(data.description,400);
  const router = useRouter();
  return (
    <>
    <div className={styles.card}>
             <div className={styles.card_inner}>
               <div className={styles.card_front}>
                
                <Image loader={imageKitLoader} src={`${data.thumbnail}`} alt={data.title} width={100} height={100} style={{width:'100%',height:'auto'}} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} priority={true} loading='eager'/>
                <div className={styles.caption}>{data.title}</div>
               </div>
               <div className={styles.card_back} onClick={() => router.push(`/residential-properties/${data.slug}`)}>
                 <Link href={`/residential-properties/${data.slug}`}>
                 <div className={styles.content}>
                   <h3>{data.title}</h3>
                   <p dangerouslySetInnerHTML={{ __html: description }}/>
                   <p className="simple-btn text-center">Read More →</p>
                 </div>
                   </Link>
               </div>
             </div>
    </div>
    </>
  )
}

export default PTypeCard
