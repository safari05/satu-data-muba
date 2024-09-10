import React from "react";
import { Breadcrumbs, ContentDetailInfoGraphic } from "@/components/organisms";

const DetailInfoGraphicScreen = ({ initialData }) => {
  return (
    <>
      <Breadcrumbs name="Detail Info Grafis" />
      <ContentDetailInfoGraphic data={initialData} />
    </>
  );
};

export default DetailInfoGraphicScreen;
