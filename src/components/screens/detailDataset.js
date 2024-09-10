"use client";
import { ProfileDetailDataset } from "../organisms";
import { Container, ImageFallback } from "../atoms";
import { ContentDetailDataset } from "../organisms/contentDetailDataset";
import { useQueryDatasetDetailPreview } from "@/hooks";

const DetailDatasetScreen = ({ slug }) => {
  const { data } = useQueryDatasetDetailPreview(slug);
  if (data === null)
    return (
      <center>
        <ImageFallback
          src={"/assets/svg/ilus-empty-dataset.svg"}
          alt="empty-dataset"
          width={300}
          height={285}
          className="w-[300px] h-[285px] object-contain rounded-md my-16"
          fallbackSrc={"/assets/svg/ilus-empty-dataset.svg"}
        />
        <h1 className="text-white">Ups, sepertinya tidak ada dataset!</h1>
      </center>
    );
  return (
    <Container>
      <div className="flex md:flex-nowrap flex-wrap gap-8">
        <div className="md:w-3/12 w-12/12 order-2 md:order-1">
          <ProfileDetailDataset data={data} />
        </div>
        <div className="md:w-9/12 w-12/12 md:order-2">
          <ContentDetailDataset data={data} />
        </div>
      </div>
    </Container>
  );
};

export default DetailDatasetScreen;
