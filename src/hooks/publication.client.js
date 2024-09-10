import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const usePublicationQuery = (initData) => {
  const data = useQuery({
    queryKey: ["hydrate-publication"],
    queryFn: () => DatasetService.getPublicationDocument(),
    keepPreviousData: true,
    initialData: initData,
  });
  return data;
};
