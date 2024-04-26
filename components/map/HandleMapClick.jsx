// useMapClick.js
'use client'
import { useState } from 'react';

const useMapClick = () => {
    const [parcelInfo, setParcelInfo] = useState({ id: null, coordinates: null });

    const handleMapClick = (event) => {
        console.log("Map clicked", event);

        const features = event.features || event.target.queryRenderedFeatures(event.point) || [];
        console.log("Features found:", features);

        if (features.length > 0) {
            const feature = features[0];
            console.log("Feature clicked:", feature);
            setParcelInfo({ 
              id: `${feature.properties.ID}-${new Date().getTime()}`, // Assume your feature has an ID property
              coordinates: event.lngLat // Save the click location
            });
        }
    };

    return { parcelInfo, handleMapClick, setParcelInfo };
};

export default useMapClick;
