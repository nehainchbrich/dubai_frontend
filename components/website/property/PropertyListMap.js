// components/PropertyListMap.js
import React from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const PropertyListMap = ({ data }) => {
  return (
    <GoogleMap
      id="map"
      mapContainerStyle={{ width: '100%', height: '600px' }}
      center={{ lat: 25.276987, lng: 55.296249 }} // Default center
      zoom={8}
      mapTypeId="satellite"
    >
      {data && data.map((property, index) => (
        <Marker key={index} position={{
            lat: parseFloat(property.latitude),
            lng: parseFloat(property.longitude),
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default PropertyListMap;
