import React from 'react'
import MyGallery from '../website/common/MyGallery'
import styles from '../../styles/SingleProperty.module.css'
const Gallery = ({images,title,tagline}) => {
  return (
    <>
       <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center mb-5'>
            <h3 className='title_about'>{title}</h3>
            <p>{tagline}</p>
          </div>
            <div className={styles.img_gallery}>
                <MyGallery items={images}/>
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
  )
}

export default Gallery
