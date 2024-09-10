import React from "react";
import { DatasetService } from "@/services";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { DetailOrganizationScreen } from "@/components/screens";

export default async function Page({ params }) {
  const getDatasetsByAgency = await DatasetService.getDatasetsByAgency(
    params.slug,
    "",
    10,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-agency-detail", 0],
    getDatasetsByAgency
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailOrganizationScreen
        initialData={getDatasetsByAgency}
        slug={params.slug}
      />
    </Hydrate>
  );
}
