'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import AutocompleteInput from '@/services/autocomplete';

const GET_PARCEL_BY_LOCATION = gql`
    query getParcel($latitude: Single, $longitude: Single) {
    executeGetParcelByLocation(longitude: $longitude, latitude: $latitude) {
      parcel_id: ID
    }
  }
`;

function Header({onParcelIdChange
}) {
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({lng: null, lat:null });
    const [triggerQuery, setTriggerQuery] = useState({ lng: null, lat: null });
    const { data, loading, error } = useQuery(GET_PARCEL_BY_LOCATION, {
        variables: { longitude: triggerQuery.lng, latitude: triggerQuery.lat },
        skip: !triggerQuery.lng || !triggerQuery.lat
    });
    const parcelId =  data?.executeGetParcelByLocation[0].parcel_id
    useEffect(() => {
        onParcelIdChange(parcelId);
    }, [parcelId, onParcelIdChange]); 

    const handleSearchSubmit = (place) => {
        if (place.geometry) {
            // If geometry data is available from Places API, use it directly
            const { lat, lng } = place.geometry.location;
            setLocation({ lng: lng(), lat: lat() });
            setTriggerQuery({ lng: lng(), lat: lat() });
        } else {
            // Alert the user that no geometry data is available
            alert('No location data available to process.');
        }
    };

    useEffect(() => {
        if (location.lat && location.lng) {
            setTriggerQuery(location);
            
        }
    }, [location]);
    console.log('Query Data:', data);

    return (
        <>
            <div className="left">
                <a href='/' className='resize-image' >
                    <Image src="/logo.png" alt="" width = {40} height ={40}  />
                    <span>Everland</span>
                </a>
                <a href ='/'>Home</a>
                <a href ='/'>About</a>
                <a href ='/'>Contact</a>
            </div>
            <div className="right">
                <AutocompleteInput onSubmit={handleSearchSubmit} /> 
                
            </div>
            </>
    
    )

}
export default Header;
