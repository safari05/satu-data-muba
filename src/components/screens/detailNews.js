import React from "react";
import { Breadcrumbs, ContentDetailNews } from "../organisms";

const DetailNewsScreen = ({ initialData }) => {
  return (
    <>
      <Breadcrumbs name="Detail Berita Satu Data" />
      <ContentDetailNews data={initialData} />
    </>
  );
};

export default DetailNewsScreen;
