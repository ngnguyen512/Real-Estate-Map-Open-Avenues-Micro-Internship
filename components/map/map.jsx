'use client'
import * as React from 'react';
import {useState, useMemo} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {
    Marker,
    Popup,
    Layer,
    CircleLayer,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl,
    Source
  } from 'react-map-gl';
import CITIES from '../../data/cities.JSON';
import Pin from './pin';
import Image from 'next/image';
import './map.css'
import {hobokenRestaurants} from '../../data/location'


import "mapbox-gl/dist/mapbox-gl.css";

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 25,
    "circle-color": '#FF69B4',
    "circle-opacity": 0.7,
  }
};

function MapBox() {
  const [popupInfo, setPopupInfo] = useState(null);
  const [vis, setVis] = useState("visible");
  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={e => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Pin />
        </Marker>
      )),
    []
  );
  const toggleLayer = () => {
		if (vis === "visible") {
			setVis("none");
		} else {
			setVis("visible");
		}
	};
  return (
   <>
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg"
      initialViewState={{
        longitude: -74.016226,
        latitude: 40.747783,
        zoom: 14
      }}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        <Source type = 'geojson' data={hobokenRestaurants}>
          <Layer layout={{ visibility: vis }} {...layerStyle} />
        </Source>
        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state} |{' '}
              <a
                target="_new"
                href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
              >
                Wikipedia
              </a>
            </div>
            <Image width={200} height={200} src={popupInfo.image} alt ="description" />
          </Popup>
        )}
      </Map>
      <button onClick={toggleLayer} className='toggleLayerButton'>
        Toggle Layer
      </button>
    </>
    
  );
}

export default MapBox;
