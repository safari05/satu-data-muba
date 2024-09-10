import { DetailDatasetPreviewScreen } from "@/components/screens";
import { getFnDatasetDetailPreview } from "@/hooks/action";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import React from "react";

export default async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-dataset-detail-preview", params.slug],
    () => getFnDatasetDetailPreview(params.slug)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <Hydrate state={dehydratedState}>
        <DetailDatasetPreviewScreen slug={params.slug} />
      </Hydrate>
    </>
  );
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const getDatasetDetail = await getFnDatasetDetailPreview(slug);
  if (getDatasetDetail) {
    var title = `Lihat Data : ${getDatasetDetail.DataHeaderName} | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
    var description = getDatasetDetail.DatasetDescription
      ? getDatasetDetail.DatasetDescription.replace(/(<([^>]+)>)/gi, "")
      : getDatasetDetail.Agency.Description;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        publishedTime: getDatasetDetail.DatasetCreatedDate,
        authors: [getDatasetDetail.Agency.Name],
      },
    };
  } else {
    return {
      title: "Dataset Not Found",
      description: "Dataset yang dicari tidak ditemukan!",
    };
  }
}
