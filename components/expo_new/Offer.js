import React from 'react'
import styles from "../../styles/expo_new/Offer.module.css";
import Image from "next/image";
import { ImagePath } from '@/helper/Helper';
const Offer = ({section}) => {
  const description = ImagePath(section?.sectionSubHeading);
  return (
    <div>
        <div className={`${styles.container} ${styles.offerMargin}`}>
            <div>
                        <h2 className={styles.locationHeading}>{section?.sectionHeading}</h2>
                        <div className={styles.lead} dangerouslySetInnerHTML={{__html:description}}></div>
                      </div>
            {section?.resourceType === 'video' ? (
                      <video className={styles.widthFull} autoPlay muted loop playsInline controls={false}>
                        <source src={section?.sectionResource} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <Image width={400} height={250}
                        src={section?.sectionResource}
                        alt={'offer'}
                        className={styles.locationImage}
                        priority
                      />
                    )}
                      
        </div>
       
    </div>
  )
}

export default Offer
