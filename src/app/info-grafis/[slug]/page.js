import { DetailInfoGraphicScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function DetailInfoGrafis({ params }) {
  const getInfoGraphicBySlug = await DatasetService.getInfoGraphicBySlug(
    params.slug
  );
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-info-graphic-by", params.slug],
    getInfoGraphicBySlug
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailInfoGraphicScreen initialData={getInfoGraphicBySlug} />
    </Hydrate>
  );
}

export async function generateMetadata({ params }) {
  const getData = await DatasetService.getInfoGraphicBySlug(params.slug);
  if (getData) {
    var title = `Lihat Info Grafis : ${getData.Title} | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
    var description = `${getData.Description.replace(/(<([^>]+)>)/gi)}`;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "article",
        images: [
          {
            url: getData.UrlInfoGraphic,
            width: 800,
            height: 600,
          },
        ],
        publishedTime: getData.CreatedDate,
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
