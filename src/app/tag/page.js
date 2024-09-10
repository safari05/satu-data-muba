import { NewsScreen, DatasetTagScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function Tag() {
  const getDatasetGroupsTag = await DatasetService.getDatasetGroupsTag(
    "",
    9999,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-tag-list"], getDatasetGroupsTag);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DatasetTagScreen initialData={getDatasetGroupsTag} />
    </Hydrate>
  );
}
