import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useDatasetCategoryQuery = (
  searchCategory,
  pageIndex,
  sort,
  initData
) => {
  const data = useQuery({
    queryKey: ["hydrate-category-list", pageIndex, searchCategory],
    queryFn: async () =>
      await DatasetService.getDatasetGroupsCategory(
        searchCategory,
        6,
        pageIndex + 1,
        sort
      ),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};

export const useDatasetCategoryDatasetQuery = (
  slug,
  search,
  pageIndex,
  sort,
  initData
) => {
  const data = useQuery({
    queryKey: ["hydrate-category-dataset", slug, pageIndex, search, sort],
    queryFn: async () =>
      await DatasetService.getDatasetsByCategory(
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
