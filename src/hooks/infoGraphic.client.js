import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useInfoGraphicListQuery = (search, pageIndex, sort, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-info-graphic-list", pageIndex, search, sort],
    queryFn: () =>
      DatasetService.getInfoGraphics(search, 6, pageIndex + 1, sort),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};

export const useInfoGraphicByQuery = (slug, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-info-graphic-by", slug],
    queryFn: () => DatasetService.getInfoGraphicBySlug(slug),
    keepPreviousData: true,
    initialData: initData,
  });
  return data;
};
