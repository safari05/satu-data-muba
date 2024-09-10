import React from "react";
import { DatasetService } from "@/services";
import { DatasetScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Data() {
  const getDatasets = await DatasetService.getDatasets("", 10, 1, "");
  const getDatasetInfo = await DatasetService.getDatasetInfo();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-datasets", 0], getDatasets);
  await queryClient.prefetchQuery(["hydrate-dataset-info"], getDatasetInfo);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DatasetScreen
        initialDataset={getDatasets}
        initialInfo={getDatasetInfo}
      />
    </Hydrate>
  );
}

export async function generateMetadata() {
  return {
    title: "Cari Dataset | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
