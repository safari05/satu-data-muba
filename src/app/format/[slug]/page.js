import { DetailDatasetFormatScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Format({ params }) {
  const getDatasetsByTag = await DatasetService.getDatasetsByType(
    params.slug,
    "",
    10,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-format-detail", params.slug],
    getDatasetsByTag
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailDatasetFormatScreen
        initialData={getDatasetsByTag}
        slug={params.slug}
      />
    </Hydrate>
  );
}
