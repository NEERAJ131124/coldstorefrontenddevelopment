import React, { useState, useEffect } from "react";
import { calculateDistance, getCurrentLocation } from "../../Common/methods";


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


