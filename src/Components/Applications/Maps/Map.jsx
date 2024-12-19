import React, { useState, useEffect, useRef } from "react";
import * as atlas from "azure-maps-control";
import "azure-maps-control/dist/atlas.min.css";
import { Button, Col, Input, Row } from "reactstrap";
import { getAllFacility } from "../../../api-service/Facility/Index";
import { useNavigate } from "react-router-dom";

const subscriptionKey = "7fusj80fNBUdtY4Y1m5qL3MfXq0tWOPjzeopPFMe4NTXn7aHKjULJQQJ99ALACYeBjFSK7XTAAAgAZMP2nFq";

const MapPage = () => {
  const [pinCode, setPinCode] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [routeLayer, setRouteLayer] = useState(null);
  const [routeDataSource, setRouteDataSource] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [isDrivingMode, setIsDrivingMode] = useState(false);
  const drivingIntervalRef = useRef(null);
  const [arrFacility, setArrFacility] = useState([]);
  // Predefined major cities of India with coordinates
  const navigate= useNavigate()

  const majorCities = [
    { name: "", coordinates: [77.209, 28.6139] },
    { name: "Mumbai", coordinates: [72.8777, 19.076] },
    { name: "Kolkata", coordinates: [88.3639, 22.5726] },
    { name: "Chennai", coordinates: [80.2707, 13.0827] },
  ];

  const getAllFacilities = async () => {
    const response = await getAllFacility(navigate);
    if (response != null) {

      const coldtstorages=[]
      response.data.forEach((item)=>{
        coldtstorages.push({name: item.Name, coordinates:[item.GeoLocation.Latitude,item.GeoLocation.Longitude]})
      })

      setArrFacility(coldtstorages)
    }
  }

  useEffect(() => {
    getAllFacilities()
  }, []);

  useEffect(() => {
    const mapInstance = new atlas.Map("map", {
      center: [80.209, 22.6139],
      zoom: 4,
      authOptions: {
        authType: "subscriptionKey",
        subscriptionKey: subscriptionKey,
      },
    });

    mapInstance.events.add("ready", () => {
      debugger;
      majorCities.length> 0 &&  majorCities.forEach((city) => {
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
      { position: "top-right" }
    );

    setMap(mapInstance);
  }, []);

  const calculateDistance = (coord1, coord2) => {
    const toRad = (value) => (value * Math.PI) / 180;
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

  const getUserLocation = () => {
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

      let nearestCity =majorCities.length>0 && majorCities.reduce((prev, curr) => {
        const prevDistance = calculateDistance(userLocation, prev.coordinates);
        const currDistance = calculateDistance(userLocation, curr.coordinates);
        return prevDistance < currDistance ? prev : curr;
      });

      const routeResponse = await fetch(
        `https://atlas.microsoft.com/route/directions/json?api-version=1.0&query=${userLocation[1]},${userLocation[0]}:${nearestCity.coordinates[1]},${nearestCity.coordinates[0]}&subscription-key=${subscriptionKey}`
      );
      const routeData = await routeResponse.json();

      if (routeData.routes && routeData.routes.length > 0) {
        const routeCoords = routeData.routes[0].legs[0].points.map((point) => [
          point.longitude,
          point.latitude,
        ]);

        const routeDataSource = new atlas.source.DataSource();
        map.sources.add(routeDataSource);
        routeDataSource.add(new atlas.data.LineString(routeCoords));

        const routeLayer = new atlas.layer.LineLayer(routeDataSource, null, {
          strokeColor: "blue",
          strokeWidth: 3,
        });
        map.layers.add(routeLayer);
        setRouteLayer(routeLayer); // Save the reference

        map.markers.add(
          new atlas.HtmlMarker({ position: userLocation, color: "blue" })
        );
        map.markers.add(
          new atlas.HtmlMarker({
            position: nearestCity.coordinates,
            color: "red",
          })
        );

        setRouteCoordinates(routeCoords);
        setError(null);

        // Trigger driving mode only if routeCoords are available
        if (routeCoords.length > 0) {
          startDrivingMode(routeCoords);
        } else {
          console.log("No route coordinates to start driving mode");
        }
      } else {
        setError("Could not fetch route directions");
        console.log("No routes found in route data");
      }
    } catch (err) {
      setError("Error fetching location or route data");
      console.error("Error in getDirectionsToNearestCity:", err);
    }
  };
  const startDrivingMode = async (routeCoords) => {
    if (routeCoords.length > 0) {
      setIsDrivingMode(true);
      console.log("Starting driving mode with coordinates:", routeCoords);

      // Wait for the state to update
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Initial setup for driving mode
      let currentIndex = 0;
      try {
        drivingIntervalRef.current = setInterval(async () => {
          if (currentIndex >= routeCoords.length) {
            clearInterval(drivingIntervalRef);
            setIsDrivingMode(false);
            console.log("Driving mode ended");
          } else {
            try {
              const currentLocation = await getUserLocation();
              console.log("Current route point:", routeCoords[currentIndex]);

              if (
                calculateDistance(currentLocation, routeCoords[currentIndex]) <
                0.05
              ) {
                currentIndex++;
              }
              if (currentIndex >= routeCoords.length) {
                clearInterval(drivingIntervalRef);
                setIsDrivingMode(false);
                console.log("Reached the end of the route");
                return;
              }
              const nextCoord = routeCoords[currentIndex];
              const bearing = atlas.math.getHeading(currentLocation, nextCoord);

              map.setCamera({
                center: nextCoord,
                zoom: 20,
                pitch: 60,
                bearing: bearing,
              });
            } catch (err) {
              console.error("Error updating driving mode:", err);
              clearInterval(drivingIntervalRef);
              setIsDrivingMode(false);
            }
          }
        }, 2000);
      } catch (error) {
        console.error("Error starting driving mode:", error);
        setIsDrivingMode(false);
      }
    } else {
      console.log("No route coordinates available");
    }
  };

  const searchPinCode = async () => {
    if (!pinCode) {
      setError("Please enter a pin code");
      return;
    }

    try {
      const response = await fetch(
        `https://atlas.microsoft.com/search/address/json?api-version=1.0&query=${pinCode}+India&subscription-key=${subscriptionKey}`
      );
      const data = await response.json();
      if (data.results.length === 0) {
        setError("No location found for this pin code");
        // Cleanup on invalid pin code
        removeRoute();
        removeAllMarkers();
        addDefaultMarkers(); // Re-add default markers
        return;
      }

      const location = data.results[0].position;
      const pinCodeCoordinates = [location.lon, location.lat];
      setCoordinates({ lat: location.lat, lon: location.lon });

      // Remove any previous markers and routes
      removeAllMarkers();
      removeRoute();

      // Find nearest city to the pin code
      let nearestCity = majorCities[0];
      let shortestDistance = calculateDistance(
        pinCodeCoordinates,
        nearestCity.coordinates
      );
      for (let i = 1; i < majorCities.length; i++) {
        const distance = calculateDistance(
          pinCodeCoordinates,
          majorCities[i].coordinates
        );
        if (distance < shortestDistance) {
          nearestCity = majorCities[i];
          shortestDistance = distance;
        }
      }

      const routeResponse = await fetch(
        `https://atlas.microsoft.com/route/directions/json?api-version=1.0&query=${pinCodeCoordinates[1]},${pinCodeCoordinates[0]}:${nearestCity.coordinates[1]},${nearestCity.coordinates[0]}&subscription-key=${subscriptionKey}`
      );
      const routeData = await routeResponse.json();
      if (routeData.routes && routeData.routes.length > 0) {
        const routeCoords = routeData.routes[0].legs[0].points.map((point) => [
          point.longitude,
          point.latitude,
        ]);
        setRouteCoordinates(routeCoords);

        const routeDataSource = new atlas.source.DataSource();
        map.sources.add(routeDataSource);
        setRouteDataSource(routeDataSource); // Save the reference

        routeDataSource.add(new atlas.data.LineString(routeCoords));

        const routeLayer = new atlas.layer.LineLayer(routeDataSource, null, {
          strokeColor: "blue",
          strokeWidth: 3,
        });
        map.layers.add(routeLayer);
        setRouteLayer(routeLayer); // Save the reference

        // Add markers for the pin code and the nearest city
        const pinMarker = new atlas.HtmlMarker({
          position: pinCodeCoordinates,
          color: "blue",
        });
        const cityMarker = new atlas.HtmlMarker({
          position: nearestCity.coordinates,
          color: "red",
        });

        setMarkers([pinMarker, cityMarker]);
        map.markers.add(pinMarker);
        map.markers.add(cityMarker);

        setError(null);
      } else {
        setError("Could not fetch route directions");
        removeAllMarkers();
        addDefaultMarkers(); // Show default markers
      }
    } catch (err) {
      setError("Error fetching location or route data");
      console.error(err);
      removeRoute();
      removeAllMarkers();
      addDefaultMarkers(); // Show default markers on error
    }
  };

  const stopDrivingMode = () => {
    if (drivingIntervalRef.current) {
      clearInterval(drivingIntervalRef.current);
      drivingIntervalRef.current = null;
    }
    setIsDrivingMode(false);

    // Remove route and driving markers
    removeRoute();
    removeAllMarkers();

    // Re-add default markers
    addDefaultMarkers();

    console.log("Driving mode stopped");
  };

  const addDefaultMarkers = () => {
    // Add major city markers
    majorCities.length>0 && majorCities.forEach((city) => {
      const marker = new atlas.HtmlMarker({
        htmlContent: `<div className="relative">
                        <div class='city-name' style="font-weight: bold; color: red; background-color: white; padding-inline: 4px; margin-top: 8px;">${city.name}</div>
                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="26" height="26" viewBox="0 0 256 256" xml:space="preserve">
                        <!-- SVG content here -->
                      </div>`,
        position: city.coordinates,
        pixelOffset: [5, -18],
      });
      setMarkers((prevMarkers) => [...prevMarkers, marker]);
      map.markers.add(marker);
    });
  };

  const removeRoute = () => {
    if (routeLayer) {
      map.layers.remove(routeLayer); // Remove the route layer
      setRouteLayer(null); // Clear the state
    }

    if (routeDataSource) {
      map.sources.remove(routeDataSource); // Remove the route data source
      setRouteDataSource(null); // Clear the state
    }

    setRouteCoordinates([]); // Clear route coordinates
    console.log("Route removed successfully");
  };

  const removeMarker = () => {
    if (markers.length > 0) {
      const marker = markers.pop();
      map.markers.remove(marker);
      setMarkers([...markers]);
    }
  };

  const removeAllMarkers = () => {
    markers.forEach((marker) => map.markers.remove(marker));
    setMarkers([]);
  };

  return (
    <div className="h-screen">
      <Row className="align-items-center">
        <Col sm={2}>
          <Input
            type="text"
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
            placeholder="Enter Pin Code"
            className="border border-gray-300 rounded-md px-3 py-2"
          />
        </Col>
        <Col sm={1}>
          <Button onClick={searchPinCode} className="mx-2" style={{ backgroundColor: "palegreen" }}>

            Search
          </Button>
        </Col>
        <Col sm={3}>
          <Button
            onClick={getDirectionsToNearestCity}
            color="success"
            className="mx-2"
          >
            Direction to Nearest Store Facility
          </Button>
        </Col>
        {isDrivingMode && (
          <Col sm={2}>
            <Button onClick={stopDrivingMode} color="danger" className="mx-2">
              Stop Driving Mode
            </Button>
          </Col>
        )}
        <Col sm={2}>
          <Button onClick={removeMarker} color="danger" className="mx-2">
            Remove map markers
          </Button>
        </Col>
        <Col sm={2}>
          <Button onClick={removeRoute} color="success" className="mx-2">
            Remove routes
          </Button>
        </Col>
      </Row>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div
        id="map"
        style={{ width: "100%", minHeight: "500px", height: "85vh" }}
      ></div>

      {coordinates && (
        <p>
          Coordinates: {coordinates.lat}, {coordinates.lon}
        </p>
      )}
    </div>
  );
};

export default MapPage;
