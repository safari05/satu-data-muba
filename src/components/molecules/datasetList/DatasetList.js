"use client";
import { BadgeTagDataset, ImageFallback } from "@/components/atoms";
import Link from "next/link";
import React from "react";

export const DatasetList = ({ img, title, desc, tags = [], href = "/" }) => {
  return (
    <div className="group relative cursor-pointer border-solid border-b-[0.8px] border-[#0D9AB9] pb-5 pt-5">
      <Link href={href}>
        <div className="flex">
          <div className="w-3/12 md:w-1/12 mr-5">
            <ImageFallback
              src={img}
              alt="empty-dataset"
              width={60}
              height={60}
              className="w-[80px] h-[60px] object-contain rounded-md mb-3 bg-white p-2"
              fallbackSrc={"/assets/images/img-logo-muba.png"}
            />
          </div>
          <div className="w-9/12 md:w-11/12">
            <h6 className="text-white font-semibold md:text-lg text-sm mb-1">
              {title}
            </h6>
            <p
              className="text-white font-light md:text-sm text-xs line-clamp-3"
              dangerouslySetInnerHTML={{ __html: desc || "<div />" }}
            />
          </div>
        </div>
        {tags.length > 0 && (
          <div className="flex items-center mt-3">
            <div className="w-[80px] mr-5">
              <h6 className="text-white font-bold text-sm text-end">Tags :</h6>
            </div>
            <div className="flex items-center gap-2">
              {tags.map((item, index) => {
                return <BadgeTagDataset key={index} name={item.Name} />;
              })}
            </div>
          </div>
        )}
        <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 group-hover:animate-shine" />
      </Link>
    </div>
  );
};
