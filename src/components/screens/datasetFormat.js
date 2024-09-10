import React from "react";
import { Breadcrumbs, ContentDatasetFormat } from "../organisms";

const DatasetFormatScreen = ({ initialData }) => {
  return (
    <>
      <Breadcrumbs name="FORMAT TIPE DATASET" />
      <ContentDatasetFormat data={initialData} />
    </>
  );
};

export default DatasetFormatScreen;
