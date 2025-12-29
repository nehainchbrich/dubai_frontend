import Link from 'next/link';
import React, { useState, useEffect } from 'react';
const Popup = ({data}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const popupTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    const holdTimeout = setTimeout(() => {
      setShowPopup(false);
    }, 15000);

    const nextPopupTimeout = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
    }, 20000);

    const loopTimeout = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => {
      clearTimeout(popupTimeout);
      clearTimeout(holdTimeout);
      clearTimeout(nextPopupTimeout);
      clearTimeout(loopTimeout);
    };
  }, [currentIndex,data]);

  const currentItem = data[currentIndex];

  return (
    <>
      {showPopup && currentItem && (
        <div className="alert alert-info alert-dismissible fade show fixed-bottom position-fixed wow fadeInUpBig row col-md-3 popup-alert" role="alert">
          <strong>{currentItem.title}</strong> <Link href={currentItem.permalink}>Click here</Link>
        </div>
      )}
      <style jsx>
      {`
      .popup-alert{
        background: var(--brand-color-1);
        border: 1px solid yellow;
        color: white;
        padding: 20px;
        left: 15px;
        border: 2px solid;
        border-image: var(--four-side-border);
      }
      `}
      </style>
    </>
  );
};

export default Popup;
