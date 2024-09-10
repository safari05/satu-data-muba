import React from "react";
import { DynamicMapLayer } from "react-esri-leaflet";
import MapCustom from "./MapCustom";

const MapArcgis = ({ data }) => {
  return (
    <MapCustom>
      <DynamicMapLayer url={data} />
    </MapCustom>
  );
};

export default MapArcgis;
