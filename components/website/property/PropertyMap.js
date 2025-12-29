// components/PropertyMap.js
import React, { useEffect } from 'react';

const PropertyMap = ({ data }) => {
  const center = {
    lat: parseFloat(data?.latitude),
    lng: parseFloat(data?.longitude),
  };

  useEffect(() => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center,
      zoom: 14,
    });

    const panorama = new window.google.maps.StreetViewPanorama(
      document.getElementById('pano'),
      {
        position: center,
        pov: {
          heading: 34,
          pitch: 10,
        },
      }
    );

    const marker = new window.google.maps.Marker({
      position: center,
      map: map,
    });

    map.setStreetView(panorama);
  }, [data]);

  return (
    <>
      <div className="row">
        <div id="map" className="col-md-6"></div>
        <div id="pano" className="col-md-6"></div>
      </div>
      <style>
        {`
        #map, #pano {
          width: 50%;
          height: 400px;
        }
        `}
      </style>
    </>
  );
};

export default PropertyMap;
