"use client";
import { useQueryDatasetDetailPreview } from "@/hooks";
import { InfoDataset } from "../molecules";
import { ContentPreviewDataset } from "../organisms";

const DetailDatasetPreviewScreen = ({ slug }) => {
  const { data } = useQueryDatasetDetailPreview(slug);
  return (
    <>
      <InfoDataset data={data} />
      <ContentPreviewDataset data={data} />
    </>
  );
};

export default DetailDatasetPreviewScreen;
