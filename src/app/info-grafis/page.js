import { InfoGraphicScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function InfoGrafis() {
  const getInfoGraphics = await DatasetService.getInfoGraphics("", 6, 1, "");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-info-graphic-list", 0],
    getInfoGraphics
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <InfoGraphicScreen initialData={getInfoGraphics} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  const getData = await DatasetService.getInfoGraphics("", 20, 1, "");
  if (getData) {
    var title = `Info Grafis | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
    var description = "Daftar Info Grafis Terbaru : ";
    getData.Infographics?.map((item) => {
      description += `${item.Description.replace(
        /(<([^>]+)>)/gi
      )}, Last Updated : ${item.CreatedDate}. `;
    });
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        authors: ["Admin Satu Data Muba"],
      },
    };
  } else {
    return {
      title: "Info Grafis Tidak Ada",
      description: "Info Grafis yang dicari tidak ditemukan!",
    };
  }
}
