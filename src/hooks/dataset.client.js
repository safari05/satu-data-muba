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
import { FUNCIsXml, FUNCXml2Json } from "@/utils/func";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import JSZip from "jszip";
import JSZipUtils from "jszip-utils";
import get from "lodash/get";
import shpjs from "shpjs";
import {
  getFnDatasetDetailPreview,
  getFnDatasetDetailPreviewPrivate,
} from "./action";

export const useDatasetInfoQuery = (initialData) => {
  const data = useQuery({
    queryKey: ["hydrate-dataset-info"],
    queryFn: () => DatasetService.getDatasetInfo(),
    keepPreviousData: true,
    initialData: initialData,
  });
  return data;
};

export const useDatasetsQuery = (search, pageIndex, sort, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-datasets", pageIndex, search, sort],
    queryFn: () => DatasetService.getDatasets(search, 10, pageIndex + 1, sort),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};

export const useDatasetDetailQuery = async (slug, initialData) => {
  const data = useQuery({
    queryKey: ["hydrate-dataset-detail", slug],
    queryFn: () => DatasetService.getDatasetDetail(slug),
    keepPreviousData: true,
    initialData: initialData,
  });
  var excel = {};
  var arcgis = {};
  var geoserver = {};
  var shp = {};
  if (data.data.DatasetType === "Excel") {
    await DatasetService.getDatasetDetailPreview(slug).then((res) => {
      var dataColumns = Object.keys(res[0]);
      var columns = [];
      dataColumns.map((v, i) => {
        columns.push({
          name: v,
          header: v.replace(/_/g, " ").toUpperCase(),
          selector: (row) => row.getValue(),
        });
      });
      const dataDetailDataset = {
        columns: columns,
        data: res,
      };
      excel = Object.assign(excel, { table: dataDetailDataset });
    });
  }

  if (data.data.GeoportalType === "arcgisserver") {
    var urlMetadataXml = `${data.data.UrlMetadata}/${data.data.LayerName}/MapServer/info/metadata?format=iso19139`;
    await axios.get(urlMetadataXml).then((res) => {
      arcgis = Object.assign(arcgis, { metadataXml: res.data });
    });

    var urlMetadataJson = `${data.data.UrlMetadata}/${data.data.LayerName}/MapServer/0/query?where=1%3D1&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=*&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&returnDistinctValues=false&returnTrueCurves=false&resultOffset=&resultRecordCount=&f=pjson`;
    await axios.get(urlMetadataJson).then((res) => {
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
          selector: (row) => row.getValue(),
        });
      });
      const resJson = {
        table: {
          columns: columns,
          data: row,
        },
      };
      arcgis = Object.assign(arcgis, resJson);
    });

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
      });
  }

  if (data.data.GeoportalType === "geoserver") {
    var pecahUrl = data.data.LayerName.split(":")[0];
    var urlLayerWms = `${data.data.UrlGeoportal}/${pecahUrl}/ows?srsName=EPSG:4326&service=WFS&version=1.0.0&request=GetFeature&typeName=${data.data.LayerName}&maxFeatures=50&outputFormat=application%2Fjson`;
    await axios.get(urlLayerWms).then((res) => {
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
          selector: (row) => row.getValue(),
        });
      });

      const resJson = {
        table: {
          columns: columns,
          data: row,
        },
      };
      geoserver = Object.assign(geoserver, resJson);
    });

    var urlMetadataXml = `${data.data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/xml`;
    await axios.get(urlMetadataXml).then((res) => {
      geoserver = Object.assign(geoserver, { metadataXml: res.data });
    });

    var urlMetadataJson = `${data.data.UrlMetadata}?service=CSW&version=2.0.2&request=GetRecordById&ElementSetName=full&Id=${data.data.LayerName}&outputSchema=http://www.isotc211.org/2005/gmd&outputFormat=application/json`;
    await axios.get(urlMetadataJson).then((res) => {
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
    });
  }

  if (data.data.DatasetType === "File SHP (ZIP)") {
    if (data.data.DataHeaderUrlData) {
      var promise = new JSZip.external.Promise(function (resolve, reject) {
        JSZipUtils.getBinaryContent(
          data.data.DataHeaderUrlData,
          function (err, data) {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
      promise.then(JSZip.loadAsync).then(function (zip) {
        var i = 0;
        Object.keys(zip.files).forEach(function (filename) {
          if (FUNCIsXml(filename)) {
            zip.files[filename].async("string").then(function (fileData) {
              if (i === 0) {
                shp = Object.assign(shp, { metadataXml: fileData });
              }
              i++;
            });
          }
        });
      });

      await shpjs(data.data.DataHeaderUrlData).then(function (datashp) {
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
              selector: (row) => row.getValue(),
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

  var newObj = {
    StaticExcel: excel,
    StaticArcgis: arcgis,
    StaticGeoserver: geoserver,
    StaticShp: shp,
  };
  return { ...data, data: Object.assign(data.data, newObj) };
};

export const useQueryDatasetDetailPreview = (slug) => {
  const data = useQuery({
    queryKey: ["hydrate-dataset-detail-preview", slug],
    queryFn: () => getFnDatasetDetailPreview(slug),
  });
  return data;
};

export const useQueryDatasetDetailPreviewPrivate = (slug) => {
  const data = useQuery({
    queryKey: ["hydrate-dataset-detail-preview-private", slug],
    queryFn: () => getFnDatasetDetailPreviewPrivate(slug),
  });
  return data;
};
