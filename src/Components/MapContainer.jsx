import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MapContainer = () => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [clickedLocations, setClickedLocations] = useState([]); // Array to store clicked locations and timestamps

  // Function to get user's location
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([longitude, latitude]);
          },
          (error) => {
            console.error("Error fetching location:", error);
            alert("Unable to retrieve your location.");
          }
        );
      } else {
        alert("Geolocation is not supported by your browser.");
      }
    };

    getUserLocation();
  }, []);

  // Initialize the map and handle single clicks
  useEffect(() => {
    const initializeMap = async () => {
      if (userLocation) {
        const accessToken =
          "pk.eyJ1IjoicmF2aXByYWthc2gxMjMiLCJhIjoiY20yd3Frb3dqMDliMDJwczQ5YmFsY2NpOSJ9.W_wwfpz5oiRFHalxr2rc_Q";

        try {
          // Initialize the map
          mapboxgl.accessToken = accessToken;
          mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/satellite-streets-v11", // Satellite with labels
            center: userLocation,
            zoom: 12,
          });

          // Add a marker at the user's current location
          new mapboxgl.Marker()
            .setLngLat(userLocation)
            .setPopup(new mapboxgl.Popup({ offset: 25 }).setText("You are here")) // Popup for current location
            .addTo(mapRef.current);

          // Add a click event listener to the map
          mapRef.current.on("click", (e) => {
            const { lng, lat } = e.lngLat; // Get clicked location coordinates
            const timestamp = new Date().toISOString(); // Get the current timestamp

            // Store the clicked location and timestamp in the state
            setClickedLocations((prev) => [
              ...prev,
              { coordinates: [lng, lat], time: timestamp },
            ]);
            console.log(clickedLocations);
            // Add a marker at the clicked location
            new mapboxgl.Marker()
              .setLngLat([lng, lat])
              .setPopup(
                new mapboxgl.Popup({ offset: 25 }).setText(
                  `Coordinates: ${lng.toFixed(5)}, ${lat.toFixed(5)}\nTime: ${timestamp}`
                )
              )
              .addTo(mapRef.current);
          });

          // Cleanup the map on component unmount
          return () => {
            if (mapRef.current) mapRef.current.remove();
          };
        } catch (error) {
          console.error("Error initializing the map:", error);
        }
      }
    };

    initializeMap();
  }, [userLocation]);

  // Display stored clicked locations for debugging or other purposes
  useEffect(() => {
    if (clickedLocations.length > 0) {
      console.log("Clicked locations with timestamps:", clickedLocations);
    }
  }, [clickedLocations]);

  return (
    <div>
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ height: "100vh", width: "100%" }}
      ></div>
      {/* Optional: Display the stored clicked locations */}
      <div style={{ padding: "10px", background: "#fff" }}>
        <h3>Clicked Locations:</h3>
        <ul>
          {clickedLocations.map((location, index) => (
            <li key={index}>
              Coordinates: {location.coordinates[0].toFixed(5)},{" "}
              {location.coordinates[1].toFixed(5)} - Time: {location.time}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MapContainer;
