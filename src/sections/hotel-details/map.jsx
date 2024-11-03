"use client";
import React from "react";
import { Pannel } from "@/src/components";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "520px",
  borderRadius: "10px",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

export const Map = () => {
  const [zoom, setZoom] = React.useState(10);

  return (
    <Pannel className="flex flex-col !p-0 !m-0   items-start ">

      <div className="w-full h-full flex items-center justify-center">
        <LoadScript
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_CLOUD_MAP_API_KEY}
        >
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={zoom}
          >
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </Pannel>
  );
};
