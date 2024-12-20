import React, { useState, useEffect } from "react";
import { getCurrentLocation } from "../../Common/methods";


const calculateDistance = async (lat1: number, lon1: number) => {
    const location = await getCurrentLocation();
    const toRadians = (degrees: number) => (degrees * Math.PI) / 180;

    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(location.latitude - lat1);
    const dLon = toRadians(location.longitude - lon1);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(location.latitude)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers

    return distance;
};

export const DistanceComponent = (location:any) => {
    const [distance, setDistance] = useState<number | null>(null);

    useEffect(() => {
        debugger;
        const fetchDistance = async () => {
            const result = await calculateDistance(location?.latitude, location.longitude); // Example coordinates
            setDistance(result); // Store the resolved distance
        };

        fetchDistance();
    }, []);

    return (
        <>
             {
                 distance === null ? (
                     <p>Loading...</p>
                 ) : <div>{distance.toFixed(2)} km.</div>  

             } 
        </>
      
    
  
  );
};


