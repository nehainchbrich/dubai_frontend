import React, { useState } from 'react';
import MyGallery from '../common/MyGallery';
import styles from '../../../styles/SingleProperty.module.css'
import VideoGallery from '../common/VideoGallery';
const Gallery = ({images,videos}) => {
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null);

const handleVideoPlay = (index) => {
  // Update the currently playing video index
  setPlayingVideoIndex(index);
};
  return (
    <>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center mb-5'>
            <h3 className='title_about'>Precious Moments From Our Last Real Estate Expo Back in January</h3>
            <p>{`Get a glimpse of what we've been up to! Our previous expo was beyond amazing and showcased a dynamic range of experiences & opportunities we've created.`}</p>
            <p>{`If you Missed our last Expo, don’t worry It's never too Late! Enroll now and let us meet up in Hyderabad.`}</p>
          </div>
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                
                <li className="nav-item" role="presentation">
                  <button className="btns btn-orange active" id="pills-img-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-img-gallery" type="button" role="tab" aria-controls="pills-img-gallery" aria-selected="false" tabIndex="-1">Image Gallery</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className="btns btn-orange" id="pills-video-gallery-tab" data-bs-toggle="pill" data-bs-target="#pills-video-gallery" type="button" role="tab" aria-controls="pills-video-gallery" aria-selected="false" tabIndex="-1">Video Gallery</button>
                </li>
        </ul>
        <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade row show active" id="pills-img-gallery" role="tabpanel" aria-labelledby="pills-img-gallery-tab">
            <div className={styles.img_gallery}>
                      <MyGallery items={images}/>
                  </div>
            </div>
              <div className="tab-pane fade" id="pills-video-gallery" role="tabpanel" aria-labelledby="pills-video-gallery-tab">
                <div className={`${styles.video_gallery} row`}>
                  {videos.map((item, i) => (
                        <div className='col-md-6' key={i}>
                            <VideoGallery item={item} isPlaying={playingVideoIndex === i} onPlay={() => handleVideoPlay(i)}/>
                        </div>
                    ))}
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
