import { BadgeTagMenu, Container } from "@/components/atoms";
import React from "react";

export const ContentDatasetTag = ({ data }) => {
  return (
    <Container>
      <h3 className="text-white font-bold text-xl mb-3" data-aos="fade-right">
        Telusuri Berdasarkan{" "}
        <span className="font-normal underline text-white">Tag</span>
      </h3>
      <div className="bg-[#043C40] max-h-[500px] overflow-scroll flex flex-wrap gap-3 border-solid border-2 border-[#138489] p-7 rounded-md mb-4">
        {data?.Datasets?.map((item, index) => {
          return (
            <div key={index} data-aos="fade-in">
              <BadgeTagMenu
                name={`#${item.Name} (${item.DatasetCount})`}
                href={`/tag/${item.Slug}`}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};
