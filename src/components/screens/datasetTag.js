import React from "react";
import { Breadcrumbs, ContentDatasetTag } from "../organisms";

const DatasetTagScreen = ({ initialData }) => {
  return (
    <>
      <Breadcrumbs name="TAG DATASET" />
      <ContentDatasetTag data={initialData} />
    </>
  );
};

export default DatasetTagScreen;
