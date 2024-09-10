import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useNewsListQuery = (search, pageIndex, sort, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-news-list", pageIndex, search, sort],
    queryFn: () => DatasetService.getNewses(search, 6, pageIndex + 1, sort),
    keepPreviousData: true,
    initialData: initData,
    initialDataUpdatedAt: pageIndex,
  });
  return data;
};

export const useNewsByQuery = (slug, initData) => {
  const data = useQuery({
    queryKey: ["hydrate-news-by", slug],
    queryFn: () => DatasetService.getNews(slug),
    keepPreviousData: true,
    initialData: initData,
  });
  return data;
};
