import { StatisticSectoralScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function StatistikSektoral() {
  const getIndicatorFinal = await DatasetService.getIndicatorFinal();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-indicator-final", "", new Date().getFullYear()],
    getIndicatorFinal
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <StatisticSectoralScreen initialData={getIndicatorFinal} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  return {
    title:
      "Statistik Sektoral | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
