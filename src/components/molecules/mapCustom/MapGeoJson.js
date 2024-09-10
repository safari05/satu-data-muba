import React from "react";
import { GeoJSON } from "react-leaflet";
import MarkerClusterGroup from "@changey/react-leaflet-markercluster";
import MapCustom from "./MapCustom";

const MapGeoJson = ({ data }) => {
  const handleEachFeatureShp = (feature, layer) => {
    var html = `<div style="height:333px;overflow: scroll;"><table className="table table-bordered">`;

    Object.keys(feature.properties).map((v, i) => {
      var title = v.replace(/_/g, " ").toUpperCase(),
        content = feature.properties[v];
      if (title !== "TABLEDATA") {
        html += `<tr><th scope="col"><div class="m-2"><b>${title}</b></div></th><td scope="col"><div class="m-2">${
          content || "-"
        }</div></td></tr>`;
      }
    });
    html += ` </table></div>`;
    layer.bindPopup(`${html}`);
  };
  return (
    <MapCustom>
      <MarkerClusterGroup>
        <GeoJSON
          key={`${new Date().getTime()}`}
          data={data}
          onEachFeature={handleEachFeatureShp}
          color="#2d6625"
          fillColor="#fdf3cd"
        />
      </MarkerClusterGroup>
    </MapCustom>
  );
};

export default MapGeoJson;
