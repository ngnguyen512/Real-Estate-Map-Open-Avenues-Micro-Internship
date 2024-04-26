
'use client'
import { useQuery, gql } from '@apollo/client';

const GET_PARCEL_BY_LOCATION = gql`
    query GetParcelByLocation($latitude: Float!, $longitude: Float!) {
        getParcelByLocation(latitude: $latitude, longitude: $longitude) {
            parcel_id
        }
    }
`;

export const useFetchParcelId = (coordinates) => {
    // Initialize default states
    let loading = false;
    let error = null;

    // Check if coordinates are provided and valid before running the query
    const isValidCoordinates = coordinates && typeof coordinates.lat === 'number' && typeof coordinates.lng === 'number';

    // UseQuery hook with dynamic skip parameter
    const { data, loading: queryLoading, error: queryError } = useQuery(GET_PARCEL_BY_LOCATION, {
        variables: {
            latitude: isValidCoordinates ? coordinates.lat : 0,
            longitude: isValidCoordinates ? coordinates.lng : 0
        },
        skip: !isValidCoordinates // Skip the query if coordinates are invalid or not provided
    });

    // Update loading and error states based on the query status
    if (isValidCoordinates) {
        loading = queryLoading;
        error = queryError;
    }

    return {
        parcelId: isValidCoordinates && data && data.getParcelByLocation ? data.getParcelByLocation.parcel_id : null,
        loading,
        error
    };
};
