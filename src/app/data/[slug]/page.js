import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { DetailDatasetScreen } from "@/components/screens";
import { getFnDatasetDetailPreview } from "@/hooks/action";

export default async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-dataset-detail-preview", params.slug],
    () => getFnDatasetDetailPreview(params.slug)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailDatasetScreen slug={params.slug} />
    </Hydrate>
  );
}

export async function generateMetadata({ params }) {
  const getDatasetDetail = await getFnDatasetDetailPreview(params.slug);
  if (getDatasetDetail) {
    var title = `Lihat Dataset : ${getDatasetDetail.DataHeaderName} | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
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
      title: "Dataset Tidak Ada",
      description: "Dataset yang dicari tidak ditemukan!",
    };
  }
}
