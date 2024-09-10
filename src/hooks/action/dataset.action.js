import {
  MSContact,
  MSDistributor,
  MSIdentification,
  MSOnlineResources,
  MSReference,
  MSSpatialInfo,
  MSSummary,
} from "@/helpers";
import { DatasetService } from "@/services";
import { FUNCIsJSON, FUNCXml2Json } from "@/utils/func";
import axios from "axios";
import get from "lodash/get";
import shpjs from "shpjs";
import { doughnutBgColor, doughnutBorderColor } from "@/helpers";

export const getFnDatasetDetailPreview = async (slug) => {
  const data = await DatasetService.getDatasetDetail(slug);
  if (!data) return null;
  var excel = {};
  var arcgis = {};
  var geoserver = {};
  var shp = {};
  var geojson = {};

  if (data.DatasetType === "Excel") {
    await DatasetService.getDatasetDetailPreview(slug).then((res) => {
      if (res.length !== 0) {
        var dataColumns = Object.keys(res[0]);
        var columns = [];
        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });
        const dataDetailDataset = {
          columns: columns,
          data: res,
        };
        excel = Object.assign(excel, { table: dataDetailDataset });

        var axisA = [];
        var axisB = [];
        data.Fields.map((v, i) => {
          var obj = {
            label: v.Title.replace(/_/g, " ").toUpperCase(),
            value: v.Name.toLowerCase(),
          };
          if (v.FieldType === "string") {
            axisA.push(obj);
          } else {
            axisB.push(obj);
          }
        });
        const graph = {
          axisA: axisA,
          axisB: axisB,
        };
        excel = Object.assign(excel, { graph });
      }
    });
  }

  if (data.GeoportalType === "arcgisserver") {
    var urlMetadataXml = `${data.UrlMetadata}/${data.LayerName}/MapServer/info/metadata?format=iso19139`;
    await axios
      .get(urlMetadataXml)
      .then((res) => {
        arcgis = Object.assign(arcgis, { metadataXml: res.data });
      })
      .catch((err) => (geoserver = null));

    var urlMetadataJson = `${data.UrlMetadata}/${data.LayerName}/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson`;
    await axios
      .get(urlMetadataJson)
      .then((res) => {
        var data = res.data;
        var columns = [];
        var row = [];
        data.features.map((v, i) => {
          row.push(v.attributes);
        });
        data.fields.map((v, i) => {
          columns.push({
            name: v.name,
            header: v.name.replace(/_/g, " ").toUpperCase(),
          });
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        arcgis = Object.assign(arcgis, resJson);
      })
      .catch((err) => (geoserver = null));

    await axios
      .get(urlMetadataXml, { responseType: "document" })
      .then(function (res) {
        let data = res.data;
        var dataMetadata = FUNCXml2Json(data);
        var base = "metadata.";
        const outMetaArcgis = [
          {
            title: "Data Info",
            data: [
              {
                title: "Citation",
                value: get(
                  dataMetadata,
                  `${base}dataIdInfo.idCitation.resTitle.#text`
                ),
              },
              {
                title: "Language",
                value: get(dataMetadata, `${base}@attributes.xml:lang`),
              },
            ],
          },
          {
            title: "Esri",
            data: [
              {
                title: "Format",
                value: get(dataMetadata, `${base}Esri.ArcGISFormat.#text`),
              },
              {
                title: "Create Date",
                value: get(dataMetadata, `${base}Esri.CreaDate.#text`),
              },
              {
                title: "Create Time",
                value: get(dataMetadata, `${base}Esri.CreaTime.#text`),
              },
              {
                title: "Sync Once",
                value: get(dataMetadata, `${base}Esri.SyncOnce.#text`),
              },
            ],
          },
        ];
        arcgis = Object.assign(arcgis, { meta: outMetaArcgis });
      })
      .catch((err) => (geoserver = null));
  }

  if (data.GeoportalType === "geoserver") {
    var pecahUrl = data.LayerName.split(":")[0];
    // geoportal.palembang.go.id/geoserver/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=BappedaLitbang:gardulistrik_pt_25k_167120221006140605&propertyName=namobj&outputFormat=application/json
    // geoportal.palembang.go.id/geoserver/wms?service=WFS&version=1.0.0&request=GetFeature&typeName=BappedaLitbang:gardulistrik_pt_25k_167120221006140605&outputFormat=application/json
    // var urlLayerWms = `http://103.143.170.118:8585/geoserver/postgis/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=postgis%3AADMINISTRASIDESA_AR&maxFeatures=50&outputFormat=application%2Fjson`;
    var urlLayerWms = `${data.UrlGeoportal}/${pecahUrl}/ows?srsName=EPSG:4326&service=WFS&version=1.0.0&request=GetFeature&typeName=${data.LayerName}&maxFeatures=50&outputFormat=application%2Fjson`;
    await axios
      .get(urlLayerWms)
      .then((res) => {
        var datags = res.data;

        geoserver = Object.assign(geoserver, {
          spatial: FUNCIsJSON(JSON.stringify(datags)) ? datags : null,
        });

        var dataColumns = [];
        var row = [];
        var columns = [];
        datags?.features?.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          row.push(v.properties);
        });

        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });

        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        geoserver = Object.assign(geoserver, resJson);
      })
      .catch((err) => (geoserver = null));

    var urlMetadataXml = `${data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml`;
    await axios
      .get(urlMetadataXml)
      .then((res) => {
        geoserver = Object.assign(geoserver, { metadataXml: res.data });
      })
      .catch((err) => (geoserver = null));

    var urlMetadataJson = `${data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`;
    await axios
      .get(urlMetadataJson)
      .then((res) => {
        var rawMetadata = res.data;
        const outMetaGeom = [
          MSSummary(rawMetadata),
          MSIdentification(rawMetadata),
          MSSpatialInfo(rawMetadata),
          MSReference(rawMetadata),
          MSContact(rawMetadata),
          MSDistributor(rawMetadata),
          ...MSOnlineResources(rawMetadata),
        ];
        console.log("rawMetadata >> ", rawMetadata);
        console.log("outMetaGeom >> ", outMetaGeom);
        geoserver = Object.assign(geoserver, { meta: outMetaGeom });
      })
      .catch((err) => (geoserver = null));
  }

  if (data.DatasetType === "File SHP (ZIP)") {
    if (data.DataHeaderUrlData) {
      // JSZipUtils.getBinaryContent(data.DataHeaderUrlData, function (err, data) {
      //   if (!err) {
      //     console.log("data", data);
      //   }
      // });

      await shpjs(data.DataHeaderUrlData).then(function (datashp) {
        shp = Object.assign(shp, { spatial: datashp });
        var dataColumns = [];
        var row = [];
        var columns = [];
        datashp.features.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          row.push(v.properties);
        });
        dataColumns.map((v, i) => {
          if (v !== "tableData") {
            columns.push({
              name: v,
              header: v.replace(/_/g, " ").toUpperCase(),
            });
          }
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        shp = Object.assign(shp, resJson);
      });
    }
  }

  if (data.DatasetType === "GeoJson") {
    if (data.DataHeaderUrlData) {
      await axios.get(data.DataHeaderUrlData).then((res) => {
        var dataGeoJson = res.data;
        geojson = Object.assign(geojson, {
          spatial: dataGeoJson,
        });
        var dataColumns = [];
        var row = [];
        var columns = [];
        dataGeoJson.features.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          var array2 = {};
          Object.keys(v.properties).map((vx, i) => {
            var makan = v.properties[vx];
            if (
              typeof v.properties[vx] === "object" &&
              !Array.isArray(v.properties[vx]) &&
              v.properties[vx] !== null
            ) {
              makan = "[object Object]";
            }
            array2[vx] = makan;
          });
          row.push(array2);
        });

        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        geojson = Object.assign(geojson, resJson);
      });
    }
  }
  if (Object.keys(shp).length === 0) shp = null;
  if (Object.keys(geojson).length === 0) geojson = null;

  var newObj = {
    StaticExcel: excel,
    StaticArcgis: arcgis,
    StaticGeoserver: geoserver,
    StaticShp: shp,
    StaticGeojson: geojson,
  };
  return Object.assign(data, newObj);
};

export const getFnDatasetDetailPreviewPrivate = async (slug) => {
  const data = await DatasetService.getDatasetDetailPrivate(slug);
  if (!data) return null;
  var excel = {};
  var arcgis = {};
  var geoserver = {};
  var shp = {};
  var geojson = {};

  if (data.DatasetType === "Excel") {
    await DatasetService.getDatasetDetailPreviewPrivate(slug).then((res) => {
      if (res.length !== 0) {
        var dataColumns = Object.keys(res[0]);
        var columns = [];
        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });
        const dataDetailDataset = {
          columns: columns,
          data: res,
        };
        excel = Object.assign(excel, { table: dataDetailDataset });
        var axisA = [];
        var axisB = [];
        data.Fields.map((v, i) => {
          var obj = {
            label: v.Title.replace(/_/g, " ").toUpperCase(),
            value: v.Name.toLowerCase(),
          };
          if (v.FieldType === "string") {
            axisA.push(obj);
          } else {
            axisB.push(obj);
          }
        });
        const graph = {
          axisA: axisA,
          axisB: axisB,
        };
        excel = Object.assign(excel, { graph });
      }
    });
  }

  if (data.GeoportalType === "arcgisserver") {
    var urlMetadataXml = `${data.UrlMetadata}/${data.LayerName}/MapServer/info/metadata?format=iso19139`;
    await axios
      .get(urlMetadataXml)
      .then((res) => {
        arcgis = Object.assign(arcgis, { metadataXml: res.data });
      })
      .catch((err) => (geoserver = null));

    var urlMetadataJson = `${data.UrlMetadata}/${data.LayerName}/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson`;
    await axios
      .get(urlMetadataJson)
      .then((res) => {
        var data = res.data;
        var columns = [];
        var row = [];
        data.features.map((v, i) => {
          row.push(v.attributes);
        });
        data.fields.map((v, i) => {
          columns.push({
            name: v.name,
            header: v.name.replace(/_/g, " ").toUpperCase(),
          });
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        arcgis = Object.assign(arcgis, resJson);
      })
      .catch((err) => (geoserver = null));

    await axios
      .get(urlMetadataXml, { responseType: "document" })
      .then(function (res) {
        let data = res.data;
        var dataMetadata = FUNCXml2Json(data);
        var base = "metadata.";
        const outMetaArcgis = [
          {
            title: "Data Info",
            data: [
              {
                title: "Citation",
                value: get(
                  dataMetadata,
                  `${base}dataIdInfo.idCitation.resTitle.#text`
                ),
              },
              {
                title: "Language",
                value: get(dataMetadata, `${base}@attributes.xml:lang`),
              },
            ],
          },
          {
            title: "Esri",
            data: [
              {
                title: "Format",
                value: get(dataMetadata, `${base}Esri.ArcGISFormat.#text`),
              },
              {
                title: "Create Date",
                value: get(dataMetadata, `${base}Esri.CreaDate.#text`),
              },
              {
                title: "Create Time",
                value: get(dataMetadata, `${base}Esri.CreaTime.#text`),
              },
              {
                title: "Sync Once",
                value: get(dataMetadata, `${base}Esri.SyncOnce.#text`),
              },
            ],
          },
        ];
        arcgis = Object.assign(arcgis, { meta: outMetaArcgis });
      })
      .catch((err) => (geoserver = null));
  }

  if (data.GeoportalType === "geoserver") {
    var pecahUrl = data.LayerName.split(":")[0];
    var urlLayerWms = `${data.UrlGeoportal}/${pecahUrl}/ows?srsName=EPSG:4326&service=WFS&version=1.0.0&request=GetFeature&typeName=${data.LayerName}&maxFeatures=50&outputFormat=application%2Fjson`;
    await axios
      .get(urlLayerWms)
      .then((res) => {
        var datags = res.data;
        geoserver = Object.assign(geoserver, {
          spatial: datags,
        });

        var dataColumns = [];
        var row = [];
        var columns = [];
        datags?.features?.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          row.push(v.properties);
        });

        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });

        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        geoserver = Object.assign(geoserver, resJson);
      })
      .catch((err) => (geoserver = null));

    var urlMetadataXml = `${data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml`;
    await axios
      .get(urlMetadataXml)
      .then((res) => {
        geoserver = Object.assign(geoserver, { metadataXml: res.data });
      })
      .catch((err) => (geoserver = null));

    var urlMetadataJson = `${data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`;
    await axios
      .get(urlMetadataJson)
      .then((res) => {
        var rawMetadata = res.data;
        const outMetaGeom = [
          MSSummary(rawMetadata),
          MSIdentification(rawMetadata),
          MSSpatialInfo(rawMetadata),
          MSReference(rawMetadata),
          MSContact(rawMetadata),
          MSDistributor(rawMetadata),
          ...MSOnlineResources(rawMetadata),
        ];
        geoserver = Object.assign(geoserver, { meta: outMetaGeom });
      })
      .catch((err) => (geoserver = null));
  }

  if (data.DatasetType === "File SHP (ZIP)") {
    if (data.DataHeaderUrlData) {
      // JSZipUtils.getBinaryContent(data.DataHeaderUrlData, function (err, data) {
      //   if (!err) {
      //     console.log("data", data);
      //   }
      // });

      await shpjs(data.DataHeaderUrlData).then(function (datashp) {
        shp = Object.assign(shp, { spatial: datashp });

        var dataColumns = [];
        var row = [];
        var columns = [];
        datashp.features.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          row.push(v.properties);
        });

        dataColumns.map((v, i) => {
          if (v === "tableData") {
            // console.log('lewat nih bos, senggol dong')
          } else {
            columns.push({
              name: v,
              header: v.replace(/_/g, " ").toUpperCase(),
            });
          }
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        shp = Object.assign(shp, resJson);
      });
    }
  }

  if (data.DatasetType === "GeoJson") {
    if (data.DataHeaderUrlData) {
      await axios.get(data.DataHeaderUrlData).then((res) => {
        var dataGeoJson = res.data;
        geojson = Object.assign(geojson, {
          spatial: dataGeoJson,
        });
        var dataColumns = [];
        var row = [];
        var columns = [];
        dataGeoJson.features.map((v, i) => {
          dataColumns = Object.keys(v.properties);
          var array2 = {};
          Object.keys(v.properties).map((vx, i) => {
            var makan = v.properties[vx];
            if (
              typeof v.properties[vx] === "object" &&
              !Array.isArray(v.properties[vx]) &&
              v.properties[vx] !== null
            ) {
              makan = "[object Object]";
            }
            array2[vx] = makan;
          });
          row.push(array2);
        });

        dataColumns.map((v, i) => {
          columns.push({
            name: v,
            header: v.replace(/_/g, " ").toUpperCase(),
          });
        });
        const resJson = {
          table: {
            columns: columns,
            data: row,
          },
        };
        geojson = Object.assign(geojson, resJson);
      });
    }
  }

  var newObj = {
    StaticExcel: excel,
    StaticArcgis: arcgis,
    StaticGeoserver: geoserver,
    StaticShp: shp,
    StaticGeojson: geojson,
  };
  return Object.assign(data, newObj);
};

export const getFnDatasetDataGraph = (axisA, axisB, gayaGrafik, data) => {
  var labelA = [];
  var labelB = [];
  var labelBgColor = [];
  var labelBorderColor = [];
  Object.keys(data).map((v) => {
    labelA.push(data[v][axisA]);
    labelB.push(data[v][axisB]);
    labelBgColor.push(doughnutBgColor[v]);
    labelBorderColor.push(doughnutBorderColor[v]);
  });

  var dataGrafik;
  if (gayaGrafik === "Bar Chart") {
    dataGrafik = {
      labels: labelA,
      datasets: [
        {
          label: axisA.toUpperCase(),
          backgroundColor: "rgb(76 175 77 / 0.59)",
          borderColor: "rgb(253 243 205)",
          borderWidth: 1,
          hoverBackgroundColor: "rgb(76 175 77 / 0.59)",
          hoverBorderColor: "rgb(253 243 205)",
          data: labelB,
        },
      ],
    };
  }
  if (gayaGrafik === "Doughnut") {
    dataGrafik = {
      labels: labelA,
      datasets: [
        {
          label: axisA.toUpperCase(),
          data: labelB,
          backgroundColor: labelBgColor,
          borderColor: labelBorderColor,
          borderWidth: 1,
        },
      ],
    };
  }
  if (gayaGrafik === "Line Chart") {
    dataGrafik = {
      labels: labelA,
      datasets: [
        {
          label: axisA.toUpperCase(),
          data: labelB,
          borderColor: "rgb(253 243 205)",
          backgroundColor: "rgb(76 175 77 / 0.59)",
        },
      ],
    };
  }

  return dataGrafik;
};
