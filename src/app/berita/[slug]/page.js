import { DetailNewsScreen } from "@/components/screens";
import { DatasetService } from "@/services";
import { Hydrate, getQueryClient } from "@/utils/rq";
import { dehydrate } from "@tanstack/react-query";

export default async function Berita({ params }) {
  const getNews = await DatasetService.getNews(params.slug);
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-news-by", params.slug], getNews);
  const dehydratedState = dehydrate(queryClient);
  return (
    <Hydrate state={dehydratedState}>
      <DetailNewsScreen initialData={getNews} />
    </Hydrate>
  );
}

export async function generateMetadata({ params }) {
  const getData = await DatasetService.getNews(params.slug);
  if (getData) {
    var title = `Lihat Berita : ${getData.Title} | Portal Satu Data Muba Kabupaten Musi Banyuasin`;
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
            url: getData.FileName,
            width: 800,
            height: 600,
          },
        ],
        publishedTime: getData.LastUpdate,
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
