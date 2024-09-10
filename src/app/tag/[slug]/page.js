import { DetailDatasetTagScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Tag({ params }) {
  const getDatasetsByTag = await DatasetService.getDatasetsByTag(
    params.slug,
    "",
    10,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-tag-detail", params.slug],
    getDatasetsByTag
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailDatasetTagScreen
        initialData={getDatasetsByTag}
        slug={params.slug}
      />
    </Hydrate>
  );
}
