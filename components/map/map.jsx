'use client'
import * as React from 'react';
import {useState, useMemo, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import Map, {
    Marker,
    Popup,
    Layer,
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
import {hobokenRestaurants} from '../../data/location';
import mapboxgl from 'mapbox-gl';
import Sidebar from './sidebar/Sidebar';
import { MapLayerMouseEvent } from "react-map-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useMap } from 'react-map-gl';

const layerStyle = {
  id: "point",
  type: "circle",
  paint: {
    "circle-radius": 25,
    "circle-color": '#FF69B4',
    "circle-opacity": 0.7,
  }
};

function MapBox({ onParcelClick, parclebytype }) {
  const { map } = useMap();
  const [popupInfo, setPopupInfo] = useState(null);
  const [vis, setVis] = useState("visible");
  const [parcelInfo, setParcelInfo] = useState({ id: null, coordinates: null })
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
    
    const handleMapClick = (event) => {
        
  
        const features  = (event.target.queryRenderedFeatures && event.target.queryRenderedFeatures(event.point, { layers: ['parcel-fill-layer'] })) || [];
        console.log("Features found:", features);
  
        if (features.length > 0 && features[0].layer.id === "parcel-fill-layer" ) {
            const feature = features[0];
            console.log("Feature clicked:", feature);
            const parcelInfo = {
              id: feature.properties.ID,
              coordinates: event.lngLat
            }
            setParcelInfo({id: `${feature.properties.ID}`, // Assume your feature has an ID property
            coordinates: event.lngLat });
            onParcelClick(parcelInfo.id);
        }
    };

    // useEffect(() => {
      
    //   console.log("Parcel ID has changed:", parclebytype);
    // }, [parclebytype]); // Re-run this effect if parcelId changes
    useEffect(() => {
      if (!map || !map.isStyleLoaded()) return;

    }, [map, parclebytype,parcelInfo.id]); 
  
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
      onClick={handleMapClick}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        <ScaleControl />
        {parcelInfo.coordinates && (
          <Popup
            longitude={parcelInfo.coordinates.lng}
            latitude={parcelInfo.coordinates.lat}
            onClose={() => setParcelInfo({ id: null, coordinates: null })}
          >
            <div>Parcel ID: {parcelInfo.id}</div>
          </Popup>
        )}
        <Source type = 'geojson' data={hobokenRestaurants}>
          <Layer layout={{ visibility: vis }} {...layerStyle} />
        </Source>
        

        <Source
                    id="parcel-source"
                    type="vector"
                    url="mapbox://svayser.ae1mculr"
                >
                    <Layer
                        id="parcel-line-layer"
                        source="parcel-source"
                        type="line"
                        source-layer="manhattan_staten_island_parce-7ng65o"
                        layout={{
                            "line-join": "round",
                            "line-cap": "round",
                        }}
                        paint={{
                            "line-color": "black",
                            "line-width": 1,
                        }}
                        beforeId='water'
                    />
                    <Layer
                        id="parcel-fill-layer"
                        type="fill"
                        source="parcel-source"
                        source-layer="manhattan_staten_island_parce-7ng65o"
                        paint={{
                            'fill-color': [
                                'case',
                                ['==', ['get', 'ID'], parcelInfo.id], 
                                'blue',
                                'light pink' 
                            ],
                            'fill-opacity': 0.7
                        }}
                        beforeId='water'
            />
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
        Circle Layer
      </button>
    </>
    
  );
}


export default MapBox;