import { DatasetFormatScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function Format() {
  const getNewses = await DatasetService.getDatasetGroupsDatasetType(
    "",
    9999,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-format-list", 0], getNewses);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DatasetFormatScreen initialData={getNewses} />
    </Hydrate>
  );
}
