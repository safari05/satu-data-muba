import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useDatasetAgencyQuery = (search, pageIndex, sort, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-agency-list", pageIndex, search, sort],
    queryFn: () =>
      DatasetService.getDatasetGroupsAgency(search, 6, pageIndex + 1, sort),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};

export const useDatasetAgencyDatasetQuery = (
  slug,
  search,
  pageIndex,
  sort,
  initData
) => {
  const data = useQuery({
    queryKey: ["hydrate-agency-dataset", slug, pageIndex, search, sort],
    queryFn: async () =>
      await DatasetService.getDatasetsByAgency(
        slug,
        search,
        10,
        pageIndex + 1,
        sort
      ),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};
