"use client";
import Image from "next/image";
import React from "react";
import { BigPlayButton, Player } from "video-react";

export const BannerImageList = ({ img, desc }) => {
  return (
    <div className="group relative">
      {!img.endsWith(".mp4") ? (
        <Image
          src={img}
          width={800}
          height={300}
          className="w-[800px] md:h-[350px] h-[200px] object-cover rounded-md"
          alt="image-banner"
        />
      ) : (
        <div className="w-full md:h-[350px] h-[290px] rounded-md mb-3 p-1 bg-[#052325C4]">
          <Player
            fluid={true}
            autoPlay={true}
            muted={true}
            width={"100%"}
            height={350}
          >
            <source src={img} className="rounded-md bg-[#052325C4]" />
            <BigPlayButton position="center" />
          </Player>
        </div>
      )}
      <div className="absolute w-full bottom-0 p-3 bg-[#052325C4] opacity-100 rounded-b-md transition-opacity duration-500 group-hover:opacity-10">
        <div
          className="text-white md:text-sm text-xs font-light"
          dangerouslySetInnerHTML={{ __html: desc || <div /> }}
        />
      </div>
    </div>
  );
};
