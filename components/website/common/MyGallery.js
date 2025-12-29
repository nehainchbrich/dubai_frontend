import Image from 'next/image';
import React, { useState } from 'react';
import { PhotoSwipe } from 'react-photoswipe';
import 'react-photoswipe/lib/photoswipe.css';
import { imageKitLoader } from '@/helper/Helper';

const MyGallery = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const openPhotoSwipe = (index) => {
    setCurrentImage(index);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  // Prepare items for PhotoSwipe
  const galleryItems = items.map((item, index) => {
    const isVideo = item.fileType === 'video';
    if (isVideo) {
      return {
        html: `<video controls style="width:100%;height:auto;">
                 <source src="${process.env.API_URL}${item.thumbnails}" type="video/mp4">
                 Your browser does not support the video tag.
               </video>`,
        pid: index,
        title: item.title,
        description: item.title,
      };
    } else {
      const src =
        item.thumbnails && typeof item.thumbnails === 'string' && item.thumbnails.startsWith('http')
          ? item.thumbnails
          : `${process.env.API_URL}${item.thumbnails}`;
      return {
        src,
        w: 1920, // width of image, adjust if needed
        h: 1300, // height of image, adjust if needed
        title: item.title,
        description: item.title,
        pid: index,
      };
    }
  });

  return (
    <>
    <div className="row px-2">
  {items.slice(0, 8).map((item, index) => {
    const isLast = index === 7 && items.length > 8; // check if this is the 6th item and more items exist

    return (
      <div className="col-md-4 col-3 mb-3 px-1 position-relative" key={index}>
        {item.fileType === 'video' ? (
          <div
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => openPhotoSwipe(index)}
          >
            <Image
              loader={imageKitLoader}
              src={
                item.thumbnail ||
                '/banner/1693920360843_f6776767-5bea-4b04-954f-7c3c66f58728.jpeg'
              }
              alt={item.title}
              width={250}
              height={250}
              className="img-fluid"
              style={{ filter: 'blur(2px)' }}
            />
            <span
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '2rem',
                color: 'white',
                pointerEvents: 'none',
              }}
            >
              ▶
            </span>

            {isLast && (
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
                +{items.length - 7}
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => openPhotoSwipe(index)}
          >
            <Image
              loader={imageKitLoader}
              src={item.thumbnails}
              alt={item.title}
              width={250}
              height={250}
              className="img-fluid"
            />
            {isLast && (
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
                +{items.length - 7}
              </div>
            )}
          </div>
        )}
      </div>
    );
  })}
</div>
  {isOpen && (
        <PhotoSwipe
          isOpen={isOpen}
          items={galleryItems}
          options={{
            index: currentImage,
            zoomEl: true,
            shareEl: false,
            closeOnScroll: false,
            history: false, // disable URL hash updates
          }}
          onClose={handleClose}
        />
      )}
    </>
  );
};

export default MyGallery;
