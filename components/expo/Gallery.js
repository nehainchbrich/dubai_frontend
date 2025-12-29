import React, { useState } from 'react';
import styles from '../../styles/SingleProperty.module.css'
import MyGallery from '../website/common/MyGallery';
import VideoGallery from '../website/common/VideoGallery';
import { ImagePath } from '@/helper/Helper';
const Gallery = ({images,videos,section}) => {
  const description = ImagePath(section?.sectionSubHeading);
const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

const handleVideoPlay = (index) => {
  setPlayingVideoIndex(index);
};
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center mb-5'>
            <h3 className='title_about'>{section?.sectionHeading}</h3>
           <div className='mb-3' dangerouslySetInnerHTML={{ __html: description }}></div>
          </div>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className="btns btn-orange active" id="pills-video-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-video-gallery" type="button" role="tab" aria-controls="pills-video-gallery" aria-selected="false" tabIndex="-1">Video Gallery</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="btns btn-orange" id="pills-img-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-img-gallery" type="button" role="tab" aria-controls="pills-img-gallery" aria-selected="false" tabIndex="-1">Image Gallery</button>
                </li>
                
        </ul>
        <div className="tab-content" id="pills-tabContent">
              <div className="tab-pane fade row show active" id="pills-video-gallery" role="tabpanel" aria-labelledby="pills-video-gallery-tab">
                <div className={`${styles.video_gallery} row`}>
                  {videos.map((item, i) => (
                        <div className='col-md-6' key={i}>
                            <VideoGallery item={item} isPlaying={playingVideoIndex === i} onPlay={() => handleVideoPlay(i)} />
                        </div>
                    ))}
                </div>
              </div>
              <div className="tab-pane fade" id="pills-img-gallery" role="tabpanel" aria-labelledby="pills-img-gallery-tab">
            <div className={styles.img_gallery}>
                      <MyGallery items={images}/>
                  </div>
            </div>
          </div>
         
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
          @media (max-width: 550px) {
              .title_about {
                  font-size: 1.5rem;
                  margin: 1rem;
              }
          }
        `}
      </style>
    </>
  );
}

export default Gallery;
