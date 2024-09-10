import { OrganizationScreen } from "@/components/screens";
import React from "react";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function Organisasi() {
  const getDatasetGroupsAgency = await DatasetService.getDatasetGroupsAgency(
    "",
    6,
    1,
    ""
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-agency-detail", 0],
    getDatasetGroupsAgency
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <>
      <Hydrate state={dehydratedState}>
        <OrganizationScreen initialData={getDatasetGroupsAgency} />
      </Hydrate>
    </>
  );
}

export async function generateMetadata() {
  return {
    title:
      "Daftar Organisasi Dataset | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
