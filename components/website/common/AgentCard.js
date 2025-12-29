import React from 'react'
import styles from "../../../styles/OurTeam.module.css";
import Image from 'next/image'
import Link from 'next/link';
import {imageKitLoader } from '@/helper/Helper';
import { staticBlurDataUrl } from '@/utils/staticBlurDataUrl';
const AgentCard = ({item,type}) => {
    const fullname =`${item.firstName} ${item.lastName}`;
  return (
    <>
      <div className={`${styles.teamCard} section-animate`}>
        <Image loader={imageKitLoader} src={`${item.profile}`} alt={fullname} width={100} height={100} sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw' quality={60} placeholder='blur'  blurDataURL={staticBlurDataUrl()} />
        <div className={styles.teamCardOverlay}>
            <h3>{fullname}</h3>
            {type === 'agent' ? (
                <>
                  <p>
                    {item.designation && item.designation!='Director' ? (
                    item.designation):(
                     ' Director'
                    )}
                    </p>
                  <p className={styles.btn}>
                    <Link href={`/agent-profile/${item.slug}`}>View Profile →</Link>
                  </p>
                </>
              ) : (
                <>
                  <p>{item.designation}</p>
                </>
              )}
        </div>
        </div>
    </>
  )
}

export default AgentCard
