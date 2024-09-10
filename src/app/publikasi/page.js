import { PublicationScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Page() {
  const getPublicationDocument = await DatasetService.getPublicationDocument();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-publication"],
    getPublicationDocument
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <PublicationScreen initialData={getPublicationDocument} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  return {
    title: "Data Publikasi | Portal Satu Data Muba Kabupaten Musi Banyuasin",
    description:
      "Integrasi Satu Data Wujudkan Muba Sinergi Muba Lebih Maju. Jl. Kol. Wahid Udin, Serasan Jaya, Sekayu, Kabupaten Musi Banyuasin, Sumatera Selatan 30711",
  };
}
