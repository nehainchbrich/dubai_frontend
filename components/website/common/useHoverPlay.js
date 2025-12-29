import { useRef } from 'react';

const useHoverPlay = () => {
  const timerRef = useRef(null);

  const handleMouseEnter = (video) => {
    timerRef.current = setTimeout(() => {
      video.play();
    }, 1000); // 3 seconds delay
  };

  const handleMouseLeave = (video) => {
    clearTimeout(timerRef.current);
    video.pause();
  };

  const handleTouchStart = (video) => {
    timerRef.current = setTimeout(() => {
      video.play();
    }, 1000); // 3 seconds delay
  };

  const handleTouchEnd = (video) => {
    clearTimeout(timerRef.current);
    video.pause();
  };

  return {
    handleMouseEnter,
    handleMouseLeave,
    handleTouchStart,
    handleTouchEnd,
  };
};

export default useHoverPlay;
