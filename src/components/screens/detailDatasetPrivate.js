"use client";
import { ProfileDetailDataset } from "../organisms";
import { Container } from "../atoms";
import { ContentDetailDataset } from "../organisms/contentDetailDataset";
import { useQueryDatasetDetailPreviewPrivate } from "@/hooks";
import { Alert } from "@material-tailwind/react";

const DetailDatasetPrivateScreen = async ({ slug }) => {
  const { data } = useQueryDatasetDetailPreviewPrivate(slug);
  return (
    <Container>
      <Alert color="blue">Dataset hanya dapat dilihat oleh anda.</Alert>
      <div className="flex md:flex-nowrap flex-wrap gap-8 mt-5">
        <div className="md:w-3/12 w-12/12 order-2 md:order-1">
          <ProfileDetailDataset data={data} />
        </div>
        <div className="md:w-9/12 w-12/12 md:order-2">
          <ContentDetailDataset data={data} isPrivate={true} />
        </div>
      </div>
    </Container>
  );
};

export default DetailDatasetPrivateScreen;
