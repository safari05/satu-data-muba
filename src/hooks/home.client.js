import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useHomeQuery = (initialData) => {
  const data = useQuery({
    queryKey: ["hydrate-home"],
    queryFn: () => DatasetService.getHome(),
    keepPreviousData: true,
    initialData: initialData,
  });
  return data;
};
