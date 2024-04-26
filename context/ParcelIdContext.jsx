import React, { createContext, useContext, useState } from 'react';

const ParcelIdContext = createContext(null);

export const useParcelId = () => useContext(ParcelIdContext);

export const ParcelIdProvider = ({ children }) => {
    const [parcelId, setParcelId] = useState(null);
    return (
        <ParcelIdContext.Provider value={{parcelId, setParcelId }}>
            {children}
        </ParcelIdContext.Provider>
    );
};