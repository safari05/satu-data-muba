import { HomeScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Home() {
  const getHome = await DatasetService.getHome();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-home"], getHome);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <HomeScreen initialData={getHome} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  return {
    title: "Halaman Utama | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
