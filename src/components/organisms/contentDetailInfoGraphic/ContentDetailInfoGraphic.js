"use client";
import { Container, ImageFallback } from "@/components/atoms";
import React from "react";
import { MdDateRange, MdOpenInBrowser } from "react-icons/md";
import { Gallery, Item } from "react-photoswipe-gallery";

export const ContentDetailInfoGraphic = ({ data }) => {
  return (
    <Container>
      <div className="flex flex-wrap md:flex-nowrap gap-8">
        <div className="w-6/12">
          <div
            className="bg-[#043C40] border-solid border-2 border-[#138489] p-3 rounded-md"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <center>
              <Gallery>
                <Item original={data?.UrlThumbnail} width="700" height="768">
                  {({ ref, open }) => (
                    <ImageFallback
                      src={data?.UrlThumbnail}
                      alt={data?.UrlThumbnail}
                      width={1000}
                      height={600}
                      className="w-full h-[600px] object-contain rounded-md bg-white p-2"
                      ref={ref}
                      onClick={open}
                    />
                  )}
                </Item>
              </Gallery>
            </center>
          </div>
        </div>
        <div className="w-6/12">
          <div
            className="bg-[#138489] rounded-md p-5"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <h1 className="text-white font-semibold font-mono text-xl mb-4">
              {data?.Title}
            </h1>
            <p
              className="text-white text-base mb-5"
              dangerouslySetInnerHTML={{
                __html: data?.Description || <br />,
              }}
            />

            <div>
              <div className="flex items-center gap-3 text-white text-sm mb-2">
                <div>
                  <MdDateRange size={20} color="white" />
                </div>
                <b>Dibuat Tanggal :</b> {data?.CreatedDate}
              </div>
              <div className="flex items-center gap-3 text-white text-sm mb-2">
                <div>
                  <MdOpenInBrowser size={20} color="white" />
                </div>
                <div>
                  <b>URL :</b> {data?.Slug}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
