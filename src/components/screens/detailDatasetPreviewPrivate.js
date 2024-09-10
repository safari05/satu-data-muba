"use client";
import { useQueryDatasetDetailPreviewPrivate } from "@/hooks";
import { InfoDataset } from "../molecules";
import { ContentPreviewDataset } from "../organisms";

const DetailDatasetPreviewPrivateScreen = ({ slug }) => {
  const { data } = useQueryDatasetDetailPreviewPrivate(slug);
  return (
    <>
      <InfoDataset data={data} isPrivate />
      <ContentPreviewDataset data={data} />
    </>
  );
};

export default DetailDatasetPreviewPrivateScreen;
