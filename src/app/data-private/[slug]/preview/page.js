import { DetailDatasetPreviewPrivateScreen } from "@/components/screens";
import { getFnDatasetDetailPreviewPrivate } from "@/hooks/action";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import React from "react";

export default async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-dataset-detail-preview-private", params.slug],
    () => getFnDatasetDetailPreviewPrivate(params.slug)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <Hydrate state={dehydratedState}>
        <DetailDatasetPreviewPrivateScreen slug={params.slug} />
      </Hydrate>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: "[PRIVATE ONLY]",
    robots: {
      index: false,
      follow: true,
      nocache: true,
    },
  };
}
