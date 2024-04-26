// BuildingInfoCard.js
'use client'
import { is } from 'immutable';
import React, { useState} from 'react';

const BuildingInfoCard = ({ title, data }) => {
    // Destructure the needed properties from buildingInfo
    const [showDetails, setShowDetails] = useState(false)
    const toggleDetails = () => setShowDetails(!showDetails);

    const detailsList = Object.keys(data).map(key => (
        <p key={key}>
            <span>{key.replace(/_/g, ' ')}:</span> <span>{data[key] !== null && data[key] !== undefined && data[key] !== '' ? data[key] : '---'}</span>
        </p>
    ));
    return (
        <div className='sidebar-card'>
            <div className='card-header'>
            <h3 className='card-title'>{title}</h3>
            <button className= 'details-toggle' onClick={toggleDetails}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            </div>
            {showDetails && <div className='details'>{detailsList}</div>}
        </div>
    )


};

export default BuildingInfoCard;
