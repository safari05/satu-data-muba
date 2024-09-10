"use client";
import React from "react";
import { LayersControl, MapContainer, TileLayer } from "react-leaflet";
import marker from "leaflet/dist/images/marker-icon.png";
import marker2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";

delete Leaflet.Icon.Default.prototype._getIconUrl;
Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: marker2x.src,
  iconUrl: marker.src,
  shadowUrl: markerShadow.src,
});
const MapCustom = ({
  children,
  postionMap = { lat: -2.889663108, lng: 103.80749677 },
}) => {
  return (
    <MapContainer center={postionMap} zoom={7} scrollWheelZoom={false}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer name="Google Maps" checked>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">Google Maps</a> contributors'
            url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="World Imagery">
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">World Imagery</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {children}
    </MapContainer>
  );
};

export default MapCustom;
