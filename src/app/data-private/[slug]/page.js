import React from "react";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { DetailDatasetPrivateScreen } from "@/components/screens";
import { getFnDatasetDetailPreviewPrivate } from "@/hooks/action";

export default async function Page({ params }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-dataset-detail-preview-private", params.slug],
    () => getFnDatasetDetailPreviewPrivate(params.slug)
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailDatasetPrivateScreen slug={params.slug} />
    </Hydrate>
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
