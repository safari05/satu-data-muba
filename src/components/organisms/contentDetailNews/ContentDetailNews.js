"use client";
import { Container, ImageFallback } from "@/components/atoms";
import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import { Player, BigPlayButton } from "video-react";
import { Gallery, Item } from "react-photoswipe-gallery";

export const ContentDetailNews = ({ data }) => {
  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <div
          className="md:w-5/12 w-full"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          {data.Type === 1 ? (
            <Gallery>
              <Item original={data.FileName} width="1024" height="768">
                {({ ref, open }) => (
                  <ImageFallback
                    src={data.FileName}
                    width={600}
                    height={600}
                    alt={"img-news"}
                    className="w-full h-auto rounded-md cursor-pointer"
                    ref={ref}
                    onClick={open}
                  />
                )}
              </Item>
            </Gallery>
          ) : (
            <div className="w-[600px h-[600px] rounded-md mb-5">
              <Player playsInline fluid={false} width={"100%"} height={600}>
                <source src={data.FileName} className="rounded-md bg-white" />
                <BigPlayButton position="center" />
              </Player>
            </div>
          )}
        </div>
        <div
          className="md:w-7/12 w-full"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <h3 className="text-white text-xl font-bold font-mono mb-1">
            {data.Title}
          </h3>
          <p className="text-white text-sm mb-3 gap-3 items-center flex">
            <MdCalendarMonth size={15} color="white" />
            {data.LastUpdate}
          </p>
          <p className="text-white">{data.Description}</p>
        </div>
      </div>
    </Container>
  );
};
