'use client'
import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';

const libraries = ['places'];

function AutocompleteInput({ onSubmit }) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBZSfMh1n_pFbVEVasJ-7cRkuSNXoyKDe4", // Replace with your API key
        libraries
    });
    const autocompleteRef = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        if (isLoaded && inputRef.current) {
            autocompleteRef.current = new window.google.maps.places.Autocomplete(
                inputRef.current,
                { types: ['address']}
                );

            autocompleteRef.current.addListener('place_changed', () => {
                const place = autocompleteRef.current.getPlace();
                if (place && place.geometry) {
                    setInputValue(place.formatted_address);
                    if (onSubmit && place.geometry){
                        onSubmit(place);
                    }
                    
                } else {
                    alert("Detailed information for this address is not available. Try a different address.");
                }
            });

            return () => {
                window.google.maps.event.clearInstanceListeners(autocompleteRef.current);
            };
        }
    }, [isLoaded, onSubmit]);

    
    

    return (
        <div>
            <input
                ref={inputRef}
                type="text"
                placeholder="Enter your address"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className='input'
            />
        </div>
    );
}

export default AutocompleteInput;