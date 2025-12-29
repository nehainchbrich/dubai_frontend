import React from 'react';
import styles from '../../../styles/CommonBanner.module.css';
import Image from 'next/image';
import {imageKitLoader, isVideo } from '@/helper/Helper';
const CommonBanner = ({title,meta}) => {
let banner;
if (meta) {
  banner = (
    <div className={styles.banner_container}>
  {meta.thumbnail ? (
    isVideo(meta.thumbnail) ? (
      <video autoPlay muted loop controls={false}>
        <source src={`${process.env.API_URL}${meta.thumbnail}`} type="video/mp4" />
      </video>
    ) : (
      <Image
        loader={imageKitLoader}
        src={`${meta.thumbnail}`}
        title={title}
        className="img-fluid"
        width={100}
        height={100}
        quality={60}
        alt={title}
        sizes="(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw"
      />
    )
  ) : (
    <Image
      loader={imageKitLoader}
      src="/common/expo.jpg"
      title={title}
      alt={title}
      className="img-fluid"
      width={100}
      height={100}
      quality={60}
      sizes="(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw"
    />
  )}
  <div className={styles.banner_overlay}>
    {title ? <h1>{title}</h1> : null}
  </div>
</div>
  );
} else {
  banner=<>
      <div className={styles.banner_container}>
        <Image loader={imageKitLoader} src={`/common/expo.jpg`} title={title} alt={title} className='img-fluid' width={100} height={100} quality={60}  sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw'/>
      <div className={styles.banner_overlay}>
          <h1>{title}</h1>
      </div>
    </div>
    </>
}

  return (
    <>
      {banner}
    </>
  )
}

export default CommonBanner
