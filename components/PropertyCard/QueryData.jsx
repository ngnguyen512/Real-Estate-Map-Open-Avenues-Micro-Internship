import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client';
import BuildingInfoCard from './buildingCard';

const GET_BUILDING_INFO = gql`
  query ReonomyProperties($parcelId: String!) {
    reonomyProperties(filter: { parcel_id: { eq: $parcelId } }) {
      items {
        parcel_id
        year_built
        year_renovated
        floors
        sum_buildings_nbr
        existing_floor_area_ratio
        commercial_units
        residential_units
        total_units
        building_area
        max_floor_plate
        building_class
        frontage
        depth
        asset_type
        lot_size_sqft
        lot_size_acres
        zoning
        lot_size_depth_feet
        lot_size_frontage_feet
        census_tract
        opp_zone
        msa_name
        fips_county
        municipality
        mcd_name
        neighborhood_name
        legal_description
        zoning_district_1
        zoning_district_2
        special_purpose_district
        split_boundary
        sanborn_map_number
        zoning_map_number
      }
    }
  }
`;

const BuildingInfo = ({ parcelId }) => {
  const { loading, error, data } = useQuery(GET_BUILDING_INFO, {
    variables: { parcelId },
  });
  

  // if (loading) return (
  //   <div>
     
  //   </div>
  // );

  if (error) return (
    <div>
      
    </div>
  );

  const item = data && data.reonomyProperties && data.reonomyProperties.items.length > 0
    ? data.reonomyProperties.items[0]
    : null;

  if (!item) return (
    <div>
      <p>No data available for the provided parcel ID.</p>
    </div>
  );

  const buildingInfo = {
    "Year Built": item.year_built,
    "Year Renovated": item.year_renovated,
    "Stories": item.floors,
    "Number of Buildings": item.sum_buildings_nbr,
    "Existing Floor Area Ratio": item.existing_floor_area_ratio,
    "Commercial Units": item.commercial_units,
    "Residential Units": item.residential_units,
    "Total Units": item.total_units,
    "Building Area": item.building_area,
    "Max Floor Plate": item.max_floor_plate,
    "Building Class": item.building_class,
    "Frontage": item.frontage,
    "Depth": item.depth,
  };
  const lotInfo = {
    "Property Type": item.assetType,
    "Lot Area SF": item.lot_size_sqft,
    "Lot Area Acres": item.lot_size_acres,
    "Zoning": item.zoning, 
    "Depth": item.lot_size_depth_feet,
    "Frontage": item.lot_size_frontage_feet,
    "Census Tract": item.census_tract,
    "Opportunity Zone": item.opp_zone,  
  }
  const Location = {
    "Metropolitan Statistical Area": item.msa_name,
    "County": item.fips_county,
    "Municipality": item.municipality,
    "Minor Civil Division": item.mcd_name,
    "Neighborhood": item.neighborhood_name,
    "Legal": item.legal_description
  }
  const zoneInfo = {
    "Zoning District 1": item.zoning_district_1,
    "Zoning District 2": item.zoning_district_2,
    "Special District 1": item.special_purpose_district,
    "Split Boundary": item.split_boundary,
    "Sanborn Map #": item.sanborn_map_number,
    "Zoning Map #": item.zoning_map_number,
};
return (
  <>
  <BuildingInfoCard title = "Building Info " data={buildingInfo} />
  <BuildingInfoCard title = "Lot Info "data={lotInfo} />
  <BuildingInfoCard title = "Location "data={Location} />
  <BuildingInfoCard title = "Zone Info "data={zoneInfo} />
  </>
)
  
};

export default BuildingInfo;
