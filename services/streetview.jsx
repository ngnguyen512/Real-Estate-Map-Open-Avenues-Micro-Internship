// StreetView.js
import React, { useRef, useEffect } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

function StreetView({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBZSfMh1n_pFbVEVasJ-7cRkuSNXoyKDe4",
    libraries: ['places']
  });

  const streetViewRef = useRef(null);

  useEffect(() => {
    if (isLoaded && lat && lng) {
      new window.google.maps.StreetViewPanorama(
        streetViewRef.current, {
          position: { lat, lng },
          pov: { heading: 165, pitch: 0 },
          zoom: 1
        }
      );
    }
  }, [isLoaded, lat, lng]);

  return (
    <div ref={streetViewRef} style={containerStyle}></div>
  );
}

export default StreetView;
