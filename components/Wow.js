import React, { useEffect, useRef } from 'react';
import 'animate.css'; // Import the animate.css library for animation classes

const Wow = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let wow = null;

    const initWow = async () => {
      const { default: WOW } = await import('wowjs');
      wow = new WOW.WOW({
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: true,
        live: true,
        duration: 800,
      });

      wow.init();
    };

    const handleScroll = () => {
      if (wow) {
        wow.sync();
      }
    };

    if (typeof window !== 'undefined') {
      initWow();

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (wow) {
          wow = null;
        }
      };
    }
  }, []);

  return <div ref={containerRef} />;
};

export default Wow;
