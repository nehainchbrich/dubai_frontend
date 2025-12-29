import React from 'react'
import styles from '../../styles/landing/landing.module.css'
const Video = ({VideoG}) => {
  return (
    <>
     {VideoG && VideoG.length > 0 ? (
        <div className={`${styles.video_section} section`}>
          <video autoPlay muted loop>
            <source src={`${process.env.API_URL}${VideoG}`} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </>
  )
}

export default Video
