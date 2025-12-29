import React from 'react';
import styles from '../../../styles/CommonBanner.module.css';
import Image from 'next/image';
import { useMeta } from "@/context/MetaProvider";
import {imageKitLoader, isVideo } from '@/helper/Helper';
const Banner = (props) => {
const data = useMeta();
let {title} = props;
let banner;
if (data) {
  banner = (
    <div className={styles.banner_container}>
  {data.thumbnail ? (
    isVideo(data.thumbnail) ? (
      <video autoPlay muted loop controls={false}>
        <source src={`${process.env.API_URL}${data.thumbnail}`} type="video/mp4" />
      </video>
    ) : (
      <Image
        loader={imageKitLoader}
        src={`${data.thumbnail}`}
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
</div>
  );
} else {
  banner=<>
      <div className={styles.banner_container}>
        <Image loader={imageKitLoader} src={`/common/expo.jpg`}  alt={'MEGA REAL ESTATE EXPO OF 2024 AWAITS YOU AT HYDERABAD '} className='img-fluid' width={100} height={100} quality={60}  sizes='(max-width:50px) 2vw, (max-width:425px) 50vw, 75vw'/>
    </div>
    </>
}

  return (
    <>
      {banner}
    </>
  )
}

export default Banner
