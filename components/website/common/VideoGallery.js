import React, { useEffect, useRef } from 'react'

const VideoGallery = ({item,isPlaying, onPlay}) => {
  const videoRef = useRef(null);
  useEffect(() => {
    // Pause the video if it's not the currently playing one
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);
  return (
    <>
        <video ref={videoRef} controls loading="lazy" controlsList="nodownload" onPlay={onPlay}  poster={item.poster ? `${process.env.API_URL}${item.poster}` : null}>
            <source src={`${process.env.API_URL}${item.thumbnails}`} type={`video/${item.thumbnails.split('.').pop().toLowerCase()}`} />
        </video>
    </>
  )
}

export default VideoGallery
