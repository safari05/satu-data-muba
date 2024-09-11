

import StatisticSummaryScreen from "@/components/screens/statisticSummary";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function StatistikSummary() {
    const getIndikatorFinal = await DatasetService.getIndicatorFinal();
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(
        ["hydrate-indicator-final", "", new Date().getFullYear()],
        getIndikatorFinal
    )
    const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
        <StatisticSummaryScreen initialData={getIndikatorFinal} />
    </Hydrate>
  )
}

export async function generateMetadata() {
    return {
      title:
        "Statistik Summary | Portal Satu Data Muba Kabupaten Musi Banyuasin",
      description:
        "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
    };
  }
