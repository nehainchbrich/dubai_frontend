import styles from '../../styles/ExpoPress.module.css';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ImagePath } from '@/helper/Helper';

const SpinWin = ({ section }) => {
  const fullUrl = `${section?.sectionResource}`;
const description = ImagePath(section?.sectionSubHeading);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className={styles.press_content}>
              <h4>{section?.sectionHeading}</h4>
              <div className='mb-3 text-center' dangerouslySetInnerHTML={{ __html: description}}></div>
              <Link href="/expo-invitation" className="btns btn-orange">
                Book Your Free VIP Pass →
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="spinWin_section">
        {section?.resourceType === 'video' ? (
          <video autoPlay muted loop playsInline controls={false}>
            <source src={fullUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <Image
            src={fullUrl}
            alt="Section Visual"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        )}
      </div>

      <style jsx>{`
        .spinWin_section {
          position: relative;
          width: 100%;
          height: 100vh;
        }

        video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (max-width: 768px) {
          .spinWin_section {
            height: 40vh;
          }
        }
      `}</style>
    </>
  );
};

export default SpinWin;
