import { CategoryScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function Kategori() {
  const getDatasetGroupsCategory =
    await DatasetService.getDatasetGroupsCategory("", 6, 1, "");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-category-list", 0],
    getDatasetGroupsCategory
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <CategoryScreen initialData={getDatasetGroupsCategory} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  return {
    title:
      "Daftar Kategori Dataset | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
