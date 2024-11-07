"use client";
import React from "react";
import { Pannel } from "@/src/components";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import { useSelector } from "react-redux";

const containerStyle = {
  width: "100%",
  height: "520px",
  borderRadius: "10px",
};

const defaultCenter = {
  lat: 40.712776,
  lng: -74.005974,
};

export const Map = () => {
  const [zoom, setZoom] = React.useState(10);

  const { event } = useSelector((state) => state.allEvents.getById);
  const itineraries = event?.itinerary || [];

  const positions = itineraries.map((item) => ({
    lat: Number(item.location_ltd),
    lng: Number(item.location_lng),
  }));

  const center = positions.length > 0 ? positions[0] : defaultCenter;

  return (
    <Pannel className="flex flex-col !p-0 !m-0 items-start">
      <div className="w-full h-full flex items-center justify-center">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_MAP_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            {positions.map((position, index) => (
              <Marker
                key={index}
                position={position}
                label={{
                  text: `${index + 1}`,
                  color: "white",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              />
            ))}

            {positions.length > 1 && (
              <Polyline
                path={positions}
                options={{
                  strokeColor: "#FF0000",
                  strokeOpacity: 1.0,
                  strokeWeight: 2,
                }}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </Pannel>
  );
};
