import React, { useState, useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";


// Replace with your Azure Maps subscription key

interface City {
  name: string;
  coordinates: [number, number];
}

interface Coordinates {
  lat: number;
  lon: number;
}

const StorageLocator: React.FC = () => {
  const [pinCode, setPinCode] = useState<string>("");
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [map, setMap] = useState<atlas.Map | null>(null);
  const [markers, setMarkers] = useState<atlas.HtmlMarker[]>([]);
  const [routeLayer, setRouteLayer] = useState<atlas.layer.LineLayer | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>([]);
  const [isDrivingMode, setIsDrivingMode] = useState<boolean>(false);
  const drivingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Predefined major cities of India with coordinates
  const majorCities: City[] = [
    { name: "Delhi", coordinates: [77.209, 28.6139] },
    { name: "Mumbai", coordinates: [72.8777, 19.076] },
    { name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] },
  ];

  useEffect(() => {
    const mapInstance = new atlas.Map("map", {
      center: [80.209, 22.6139],
      zoom: 4,
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: process.env.REACT_APP_AZURE_MAPS_KEY,
      },
    });

    mapInstance.events.add("ready", () => {
      majorCities.forEach((city) => {
        const marker = new atlas.HtmlMarker({
          htmlContent: `<div className="relative" >
                        <div class='city-name' style="font-weight: bold; color: red; background-color: white; padding-inline: 4px; margin-top: 8px;">${city.name}</div>
                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="26" height="26" viewBox="0 0 256 256" xml:space="preserve">
                        <defs>
                        </defs>
                        <g style="stroke: none; stroke-width: 0; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: none; fill-rule: nonzero; opacity: 1;" transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)" >
                          <path d="M 45 90 c -1.415 0 -2.725 -0.748 -3.444 -1.966 l -4.385 -7.417 C 28.167 65.396 19.664 51.02 16.759 45.189 c -2.112 -4.331 -3.175 -8.955 -3.175 -13.773 C 13.584 14.093 27.677 0 45 0 c 17.323 0 31.416 14.093 31.416 31.416 c 0 4.815 -1.063 9.438 -3.157 13.741 c -0.025 0.052 -0.053 0.104 -0.08 0.155 c -2.961 5.909 -11.41 20.193 -20.353 35.309 l -4.382 7.413 C 47.725 89.252 46.415 90 45 90 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(4,136,219); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                          <path d="M 45 45.678 c -8.474 0 -15.369 -6.894 -15.369 -15.368 S 36.526 14.941 45 14.941 c 8.474 0 15.368 6.895 15.368 15.369 S 53.474 45.678 45 45.678 z" style="stroke: none; stroke-width: 1; stroke-dasharray: none; stroke-linecap: butt; stroke-linejoin: miter; stroke-miterlimit: 10; fill: rgb(255,255,255); fill-rule: nonzero; opacity: 1;" transform=" matrix(1 0 0 1 0 0) " stroke-linecap="round" />
                        </g>
                        </svg>
                      </div>`,
          position: city.coordinates,
          pixelOffset: [5, -18],
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
        mapInstance.markers.add(marker);
      });
    });

    // Construct and add controls to the map
    mapInstance.controls.add(
      [
        new atlas.control.ZoomControl(),
        new atlas.control.PitchControl(),
        new atlas.control.CompassControl(),
        new atlas.control.StyleControl(),
        new atlas.control.FullscreenControl(),
        new atlas.control.ScaleControl(),
      ],
      // { position: "top-right" }
    );

    setMap(mapInstance);
  }, []);

  const calculateDistance = (coord1: [number, number], coord2: [number, number]): number => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(coord2[1] - coord1[1]);
    const dLon = toRad(coord2[0] - coord1[0]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(coord1[1])) *
        Math.cos(toRad(coord2[1])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const getUserLocation = (): Promise<[number, number]> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          resolve([position.coords.longitude, position.coords.latitude]),
        (error) => reject(error)
      );
    });
  };

  const getDirectionsToNearestCity = async () => {
    try {
      const userLocation = await getUserLocation();

      let nearestCity = majorCities.reduce((prev, curr) => {
        const prevDistance = calculateDistance(userLocation, prev.coordinates);
        const currDistance = calculateDistance(userLocation, curr.coordinates);
        return prevDistance < currDistance ? prev : curr;
      });

      const routeResponse = await fetch(
        `https://atlas.microsoft.com/route/directions/json?api-version=1.0&query=${userLocation[1]},${userLocation[0]}:${nearestCity.coordinates[1]},${nearestCity.coordinates[0]}&subscription-key=${process.env.REACT_APP_AZURE_MAPS_KEY}`
      );
      const routeData = await routeResponse.json();
      if (routeData.routes && routeData.routes.length > 0) {
        const routeCoords = routeData.routes[0].legs[0].points.map((point: any) => [
          point.longitude,
          point.latitude,
        ]);

        const routeDataSource = new atlas.source.DataSource();
        map?.sources.add(routeDataSource);
        routeDataSource.add(new atlas.data.LineString(routeCoords));

        const routeLayer = new atlas.layer.LineLayer(routeDataSource, "", {
          strokeColor: "blue",
          strokeWidth: 3,
        });
        map?.layers.add(routeLayer);
        setRouteLayer(routeLayer); // Save the reference

        map?.markers.add(
          new atlas.HtmlMarker({ position: userLocation, color: "blue" })
        );
        map?.markers.add(
          new atlas.HtmlMarker({
            position: nearestCity.coordinates,
            color: "red",
          })
        );

        setRouteCoordinates(routeCoords);
        setError(null);

        // Trigger driving mode only if routeCoords are available
        startDrivingMode(routeCoords);
      }
    } catch (error) {
      setError("Error fetching route data or user location");
      console.error(error);
    }
  };

  const startDrivingMode = (routeCoords: [number, number][]) => {
    if (drivingIntervalRef.current) {
      clearInterval(drivingIntervalRef.current);
    }

    let index = 0;
    setIsDrivingMode(true);

    drivingIntervalRef.current = setInterval(() => {
      if (index < routeCoords.length) {
        const currentPosition = routeCoords[index];
        map?.setCamera({ center: currentPosition, zoom: 12 });
        index++;
      } else {
        clearInterval(drivingIntervalRef.current!);
        setIsDrivingMode(false);
      }
    }, 1000);
  };

  return (
    <div>
      <div id="map" style={{ width: "100%", height: "500px" }}></div>
      <div>
        <button onClick={getDirectionsToNearestCity}>Get Directions</button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {isDrivingMode && <div>Driving Mode Active</div>}
      </div>
    </div>
  );
};

export default StorageLocator;
