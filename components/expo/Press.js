import Image from 'next/image';
import React from 'react';
import styles from '../../styles/ExpoPress.module.css';
import Link from 'next/link';
import { ImagePath } from '@/helper/Helper';

const renderMedia = (src, type, alt = 'Media') => {
  if (!src) return null;

  if (type === 'video') {
    return (
      <video
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        className="w-100 mb-4"
        style={{ maxHeight: '600px', objectFit: 'cover' }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    );
  }

  return (
    
      <Image
        src={src}
        alt={alt}
        width={1200} height={600}
        priority
        unoptimized // use this for external full URLs to skip next/image optimization
      />
  );
};

const Press = ({ data, section }) => {
  const description = ImagePath(section?.sectionSubHeading);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12 mb-5">
            <div className={styles.press_img}>
              {renderMedia(section?.sectionResource, section?.resourceType, 'Resource 1')}
            </div>
          </div>
          <div className="col-md-12">
            <div className={styles.press_content}>
              <h4 className='title_about'>{section?.sectionHeading}</h4>
              <div className='mb-3 text-center' dangerouslySetInnerHTML={{ __html: description }}></div>
              <Link href="/expo-invitation" className="btns btn-orange">
                Book Your Free VIP Pass →
              </Link>
            </div>
          </div>
          {section?.ResourceTwo && (
            <div className="col-md-12 mt-5">
              <div className={styles.press_img}>
                {renderMedia(section.ResourceTwo, section.resourceTypeTwo, 'Resource 2')}
              </div>
            </div>
          )}
        </div>
      </div>
      <style jsx>
        {`
          .title_about {
              font-size: 3rem;
              margin: 1rem;
              text-transform: capitalize;
              font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

export default Press;
