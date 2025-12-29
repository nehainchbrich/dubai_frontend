import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import styles from '../../../styles/SingleProperty.module.css';
import { imageKitLoader } from '@/helper/Helper';
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';

const FloorPlan = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openPhotoSwipe = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Prepare gallery items for PhotoSwipe
  const galleryItems = items.map((item, index) => ({
    src:
      item.thumbnail &&
      typeof item.thumbnail === 'string' &&
      item.thumbnail.startsWith('http')
        ? item.thumbnail
        : `${process.env.API_URL}${item.thumbnail}`,
    w: 1200,
    h: 800,
    title: `${item.bedroom} BHK • ${item.area} Sq.Ft`,
    pid: index,
  }));

  return (
    <>
      {items.slice(0, 4).map((item, index) => {
        const isLastVisible = index === 3 && items.length > 4;

        return (
          <div className="col-md-6 mb-4" key={index}>
            <div className={`${styles.floorCard}`}>
              <div
                className={styles.thumbnailWrapper}
                style={{ cursor: 'pointer', position: 'relative' }}
                onClick={() => openPhotoSwipe(index)}
              >
                <Image
                  loader={imageKitLoader}
                  src={item.thumbnail}
                  alt={`Floor Plan - ${item.bedroom} BR`}
                  className={styles.thumbnail}
                  width={300}
                  height={200}
                />

                {/* Price or Ask for Price */}
                {item.amount > 0 ? (
                  <span className={styles.priceTag}>{item.convertedAmount}</span>
                ) : (
                  <Link
                    href="/contact-us"
                    className={`${styles.priceTag} ${styles.askPrice}`}
                    onClick={(e) => e.stopPropagation()} // Prevent opening gallery
                  >
                    Ask for Price
                  </Link>
                )}
                <span className={styles.badge}>{item.bedroom} BHK</span>

                {/* Overlay +count if this is the 4th item */}
                {isLastVisible && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: 'rgba(0,0,0,0.6)',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      borderRadius: '8px',
                    }}
                  >
                    +{items.length - 4}
                  </div>
                )}
              </div>

              <div className={styles.details}>
                <ul className={styles.features}>
                  <li>
                    <i className="fa-solid fa-maximize"></i> {item.area} Sq.Ft
                  </li>
                  {item.parking > 0 && (
                    <li>
                      <i className="fa-solid fa-car"></i> {item.parking} Parking
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      })}

      {/* PhotoSwipe Viewer */}
      {isOpen && (
        <PhotoSwipe
          isOpen={isOpen}
          items={galleryItems}
          options={{
            index: currentImage,
            zoomEl: true,
            shareEl: false,
            closeOnScroll: false,
            history: false,
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default FloorPlan;
