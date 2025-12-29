// components/GoogleMapsProvider.js
import React from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

const MapProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.G_Map_API,
    libraries,
  });

  if (loadError) return <div>Google Maps failed to load</div>;
  if (!isLoaded) return <div></div>;

  return <>{children}</>;
};

export default MapProvider;
