"use client";
import {
  Button,
  ButtonTab,
  Container,
  ImageFallback,
  Select,
} from "@/components/atoms";
import { DataTable } from "@/components/molecules";
import { useMemo, useRef, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import { getFnDatasetDataGraph } from "@/hooks/action";
import { FaChartBar } from "react-icons/fa";
import { useAlert } from "react-alert";
import { saveAs } from "file-saver";
import dynamic from "next/dynamic";

const MapGeoJson = (props) => {
  const MapGeoJson = useMemo(
    () =>
      dynamic(() => import("@/components/molecules/mapCustom/MapGeoJson"), {
        loading: () => <p className="text-white">loading map...</p>,
        ssr: false,
      }),
    []
  );
  return <MapGeoJson {...props} />;
};

const MapArcgis = (props) => {
  const MapArcgis = useMemo(
    () =>
      dynamic(() => import("@/components/molecules/mapCustom/MapArcgis"), {
        loading: () => <p className="text-white">loading map arcgis...</p>,
        ssr: false,
      }),
    []
  );
  return <MapArcgis {...props} />;
};

var jsonStyleCharts = [
  {
    label: "Bar Chart",
    value: "Bar Chart",
  },
  {
    label: "Line Chart",
    value: "Line Chart",
  },
  {
    label: "Doughnut",
    value: "Doughnut",
  },
];

export const ContentPreviewDataset = ({ data }) => {
  const alert = useAlert();
  const ref = useRef();
  const [numTab, setNumTab] = useState("table");
  const [gayaGrafik, setGayaGrafik] = useState("Bar Chart");
  const [labelGayaGrafik, setLabelGayaGrafik] = useState("Bar Chart");
  const [axisA, setAxisA] = useState(false);
  const [axisB, setAxisB] = useState(false);
  const [dataGrafikResult, setDataGrafikResult] = useState(null);

  const btnGrafik = async () => {
    setGayaGrafik(labelGayaGrafik?.value);
    var dataGraph = await getFnDatasetDataGraph(
      axisA?.value,
      axisB?.value,
      labelGayaGrafik?.value,
      data?.StaticExcel?.table?.data
    );
    setDataGrafikResult(dataGraph);
  };

  const onDownloadMap = (val) => {
    var pecahUrl = data.LayerName.split(":")[0];
    if (val === "geojson") {
      var url = `${data.UrlGeoportal}/${pecahUrl}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${data.LayerName}&maxFeatures=50&outputFormat=application%2Fjson`;
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `GEOJSON--${data.DataHeaderSlug}.json`);
          alert.success("Berhasil download geojson");
        })
        .catch((err) => {
          console.log(err.message);
          alert.error("Gagal download geojson");
        });
    } else if (val === "kml") {
      var url = `${data.UrlGeoportal}/${pecahUrl}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${data.LayerName}&maxFeatures=50&outputFormat=application%2Fvnd.google-earth.kml%2Bxml`;
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `KML--${data.DataHeaderSlug}.kml`);
          alert.success("Berhasil download kml");
        })
        .catch((err) => {
          console.log(err.message);
          alert.error("Gagal download kml");
        });
    } else if (val === "shapefile") {
      var url = `${data.UrlGeoportal}/${pecahUrl}/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${data.LayerName}&maxFeatures=50&outputFormat=SHAPE-ZIP`;
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          saveAs(blob, `SHAPEFILE--${data.DataHeaderSlug}.zip`);
          alert.success("Berhasil download shape file");
        })
        .catch((err) => {
          console.log(err.message);
          alert.error("Gagal download shape file");
        });
    }
  };

  var isTabMap = ["GeoJson", "URL Service Spasial", "File SHP (ZIP)"].includes(
    data?.DatasetType
  );
  return (
    <Container>
      <div
        className="bg-[#003C40] shadow-csd-tab rounded-md p-5"
        data-aos="fade-left"
      >
        <div className="flex items-start">
          <div className="grid grid-cols-3 pb-1">
            <ButtonTab
              className="bg-[#00829E] rounded-t-md cursor-pointer px-6 py-2 z-[3] text-center"
              onClick={() => setNumTab("table")}
              name={"Data"}
            />
            {isTabMap && (
              <ButtonTab
                className="bg-[#0D9AB9] rounded-tr-md -ml-1 cursor-pointer px-6 py-2 z-[2] text-center"
                onClick={() => setNumTab("map")}
                name={"Peta"}
              />
            )}
            {data?.DatasetType === "Excel" && (
              <ButtonTab
                className="bg-[#1CB3D4] rounded-tr-md -ml-1 cursor-pointer px-6 py-2 text-center"
                onClick={() => setNumTab("graph")}
                name={"Grafik"}
              />
            )}
          </div>
        </div>
        {numTab === "table" && (
          <>
            {data?.DatasetType === "Excel" && (
              <DataTable
                data={data?.StaticExcel?.table?.data}
                column={data?.StaticExcel?.table?.columns}
              />
            )}
            {data?.DatasetType === "GeoJson" && (
              <DataTable
                data={data?.StaticGeojson?.table?.data}
                column={data?.StaticGeojson?.table?.columns}
              />
            )}
            {data?.GeoportalType === "geoserver" && (
              <DataTable
                data={data?.StaticGeoserver?.table?.data}
                column={data?.StaticGeoserver?.table?.columns}
              />
            )}
            {data?.DatasetType === "Dokumen (PDF)" && (
              <iframe
                src={`${data?.DataHeaderUrlData}?p=${new Date().getTime()}`}
                className="w-full h-[550px] mb-6"
              />
            )}
            {data?.DatasetType === "File SHP (ZIP)" && (
              <DataTable
                data={data?.StaticShp?.table?.data}
                column={data?.StaticShp?.table?.columns}
              />
            )}
            {data?.GeoportalType === "arcgisserver" && (
              <DataTable
                data={data?.StaticArcgis?.table?.data}
                column={data?.StaticArcgis?.table?.columns}
              />
            )}
          </>
        )}

        {numTab === "graph" && (
          <div className="flex flex-wrap md:flex-nowrap gap-6 mt-2">
            <div className="md:w-8/12 w-full">
              {dataGrafikResult !== null ? (
                <>
                  <div className="p-3 bg-white">
                    {gayaGrafik === "Bar Chart" && (
                      <Bar
                        ref={ref}
                        data={dataGrafikResult}
                        width={100}
                        height={300}
                        options={{
                          maintainAspectRatio: false,
                        }}
                      />
                    )}

                    {gayaGrafik === "Line Chart" && (
                      <Line
                        ref={ref}
                        options={{ responsive: true }}
                        data={dataGrafikResult}
                      />
                    )}
                    {gayaGrafik === "Doughnut" && (
                      <Doughnut ref={ref} data={dataGrafikResult} />
                    )}
                  </div>
                </>
              ) : (
                <center>
                  <ImageFallback
                    src={"/assets/svg/ilus-empty-dataset.svg"}
                    alt="empty-dataset"
                    width={300}
                    height={285}
                    className="w-[300px] h-[285px] object-contain rounded-md my-5"
                    fallbackSrc={"/assets/svg/ilus-empty-dataset.svg"}
                  />
                </center>
              )}
            </div>

            <div className="md:w-4/12 w-full">
              <form>
                <div className="grid grid-cols-1 gap-3">
                  <Select
                    options={jsonStyleCharts}
                    label="Gaya Grafik*"
                    onChange={(e) => setLabelGayaGrafik(e)}
                  />

                  <Select
                    options={data?.StaticExcel?.graph?.axisA}
                    label="Axis X*"
                    onChange={(e) => setAxisA(e)}
                  />
                  <Select
                    options={data?.StaticExcel?.graph?.axisB}
                    label="Axis Y*"
                    onChange={(e) => setAxisB(e)}
                  />

                  <Button
                    name={"Pritinjau"}
                    bgColor={"bg-[#FF0000] mt-5"}
                    icon={<FaChartBar size={15} color="white" />}
                    onClick={() => btnGrafik()}
                  />
                </div>
              </form>
            </div>
          </div>
        )}

        {numTab === "map" && (
          <div className="mt-2">
            {data.DatasetType === "GeoJson" && data?.StaticGeojson && (
              <MapGeoJson data={data?.StaticGeojson?.spatial} />
            )}
            {data.DatasetType === "File SHP (ZIP)" && (
              <MapGeoJson data={data?.StaticShp?.spatial} />
            )}
            {data?.GeoportalType === "geoserver" &&
              data?.StaticGeoserver?.spatial && (
                <div>
                  <form className="justify-end float-right mb-5" method="get">
                    <div className="form-group mb-30">
                      <select
                        name="orderby"
                        className="form-control border"
                        onChange={(e) => onDownloadMap(e.target.value)}
                      >
                        <option value="">Download File</option>
                        <option value="geojson">GeoJSON</option>
                        <option value="kml">KML</option>
                        <option value="shapefile">Shapefile</option>
                      </select>
                    </div>
                  </form>
                  <MapGeoJson data={data?.StaticGeoserver?.spatial} />
                </div>
              )}
            {data?.GeoportalType === "arcgisserver" && (
              <MapArcgis
                data={`${data.UrlGeoportal}/${data.LayerName}/MapServer`}
              />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};
