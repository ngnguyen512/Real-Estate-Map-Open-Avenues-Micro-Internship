'use client'
// Include necessary imports
import React, { useState, useEffect } from 'react';
import BuildingInfo from "@/components/PropertyCard/QueryData";
import { useQuery, gql } from '@apollo/client';



function Sidebar({ parcelId = 'b212362412772c74601bda6c6a1478c9' }) {
    // Sidebar simply renders each section, which now internally manages its visibility
    return (
        <div className="sidebar">
            <h2 style={{ textAlign: 'center',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                        margin: '20px',
                        maxWidth: '600px', // Adjust this as needed
                        marginLeft: '5px',
                        marginRight: '5px' }}>      Property Information       </h2>
            <BuildingInfo parcelId={parcelId} section="building" title="Building Info" />
            
        </div>
    );
}

export default Sidebar;