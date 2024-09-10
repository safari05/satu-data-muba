import React from "react";
import { DatasetService } from "@/services";
import { dehydrate } from "@tanstack/react-query";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { DetailCategoryScreen } from "@/components/screens";

export default async function Page({ params }) {
  const getDatasetsByCategory = await DatasetService.getDatasetsByCategory(
    params.slug,
    "",
    10,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-category-dataset", params.slug],
    getDatasetsByCategory
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailCategoryScreen
        initialData={getDatasetsByCategory}
        slug={params.slug}
      />
    </Hydrate>
  );
}
