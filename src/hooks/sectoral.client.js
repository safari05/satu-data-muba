import { GlobalContext } from "@/context";
import { DatasetService } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

export const useIndicatorFinalQuery = (initialData) => {
  const { state } = useContext(GlobalContext);
  const data = useQuery({
    queryKey: [
      "hydrate-indicator-final",
      state.formGlobal.setSectorAffair.value,
      state.formGlobal.setYear.value,
    ],
    queryFn: async () =>
      await DatasetService.getIndicatorFinal(
        state.formGlobal.setSectorAffair.value,
        state.formGlobal.setYear.value
      ),
    keepPreviousData: true,
    initialData: initialData,
    initialDataUpdatedAt: state.formGlobal.setYear.value,
  });
  if (data.isSuccess) {
    var dataColumns = [];
    var row = [];
    var columns = [];
    data.data.map((v, i) => {
      dataColumns = Object.keys(v);
      row.push(v);
    });

    columns.push({
      name: "kode",
      header: "KODE",
      selector: (row) => row.getValue(),
    });
    dataColumns.map((v, i) => {
      if (v !== "kode")
        columns.push({
          name: v,
          header: v.replace(/_/g, " ").toUpperCase(),
          selector: (row) => row.getValue(),
        });
    });
    const datas = {
      columns: columns,
      data: row,
    };
    return { ...data, data: datas };
  }
  return data;
};

export const useCountIndicatorFinalQuery = () => {
  const { state } = useContext(GlobalContext);
  const data = useQuery({
    queryKey: [
      "hydrate-count-indicator-final",
      state.formGlobal.setSectorAffair.value,
      state.formGlobal.setYear.value,
    ],
    queryFn: () =>
      DatasetService.getCountIndicatorFinal(
        state.formGlobal.setSectorAffair.value,
        state.formGlobal.setYear.value
      ),
    keepPreviousData: true,
  });
  return data;
};
