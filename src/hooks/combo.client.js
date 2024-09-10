import { DatasetService } from "@/services";
import { FUNCArraySelectId, FUNCArraySelectCode } from "@/utils/func";
import { useQuery } from "@tanstack/react-query";

export const useComboYearsQuery = () => {
  const data = useQuery({
    queryKey: ["hydrate-years"],
    queryFn: () => DatasetService.getYears(),
    keepPreviousData: true,
  });
  if (data.isSuccess) return { ...data, data: FUNCArraySelectId(data.data) };
  return data;
};

export const useComboYearsIndicatorFinalQuery = () => {
  const data = useQuery({
    queryKey: ["hydrate-years-indicator-final"],
    queryFn: () => DatasetService.getYearsIndicatorFinal(),
    keepPreviousData: true,
  });
  if (data.isSuccess) return { ...data, data: FUNCArraySelectCode(data.data) };
  return data;
};

export const useComboSectorAffairsQuery = () => {
  const data = useQuery({
    queryKey: ["hydrate-sectoral-affairs"],
    queryFn: () => DatasetService.getSectorAffairs(),
    keepPreviousData: true,
  });
  if (data.isSuccess)
    return { ...data, data: FUNCArraySelectCode(data.data, true) };
  return data;
};

export const useComboSuggestionCategoryQuery = () => {
  const data = useQuery({
    queryKey: ["hydrate-suggestion-category"],
    queryFn: () => DatasetService.getUserSuggestionCategory(),
    keepPreviousData: true,
  });
  if (data.isSuccess)
    return { ...data, data: FUNCArraySelectId(data.data, true) };
  return data;
};

export const useComboDatasetCategoryQuery = () => {
  const data = useQuery({
    queryKey: ["hydrate-dataset-category"],
    queryFn: () => DatasetService.getDatasetCategory(),
    keepPreviousData: true,
  });
  if (data.isSuccess)
    return { ...data, data: FUNCArraySelectId(data.data, true) };
  return data;
};
