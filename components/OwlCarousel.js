import React, { Component } from 'react';
import dynamic from 'next/dynamic';
// Import OwlCarousel CSS here
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const ReactOwlCarousel = dynamic(() => import('react-owl-carousel'), {
  ssr: false
});

class OwlCarousel extends Component {
  render() {
    const { children, ...carouselProps } = this.props;

    // Use jQuery in a safe manner
    if (typeof window !== 'undefined' && typeof window.$ === 'undefined') {
      const jQuery = require('jquery');
      window.$ = window.jQuery = jQuery;
    }

    return <ReactOwlCarousel {...carouselProps}>{children}</ReactOwlCarousel>;
  }
}

export default OwlCarousel;
