import { NewsScreen } from "@/components/screens";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";
import { DatasetService } from "@/services";

export default async function Berita() {
  const getNewses = await DatasetService.getNewses("", 6, 1, "");
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-news-list", 0], getNewses);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <NewsScreen initialData={getNewses} />
    </Hydrate>
  );
}

export async function generateMetadata() {
  const getData = await DatasetService.getNewses("", 20, 1, "");
  if (getData) {
    var title = `Berita Satu Data | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
    var description = "Daftar Berita Terbaru : ";
    getData.News.map((item) => {
      description += `${item.Description.replace(
        /(<([^>]+)>)/gi
      )}, Last Updated : ${item.LastUpdate}. `;
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
      title: "Berita Tidak Ada",
      description: "Berita yang dicari tidak ditemukan!",
    };
  }
}
