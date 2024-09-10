"use client";
import { usePublicationQuery } from "@/hooks";
import { Breadcrumbs, ContentPublication } from "../organisms";

const PublicationScreen = ({ initialData }) => {
  const publicationQuery = usePublicationQuery(initialData);
  return (
    <>
      <Breadcrumbs name="Publikasi" />
      <ContentPublication data={publicationQuery} />
    </>
  );
};

export default PublicationScreen;
