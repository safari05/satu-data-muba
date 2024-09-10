import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useQueryTagDataset = (slug, search, pageIndex, sort, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-tag-dataset", slug, pageIndex, search, sort],
    queryFn: () =>
      DatasetService.getDatasetsByTag(slug, search, 10, pageIndex + 1, sort),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};
