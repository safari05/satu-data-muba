"use client";
import { ImageFallback } from "@/components/atoms";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

export const CarouselOrganization = ({ data, setDatasets }) => {
  return (
    <Swiper
      slidesPerView={1}
      navigation={true}
      onSlideChange={(e) => setDatasets(data[e.activeIndex]?.Datasets)}
      modules={[Navigation]}
    >
      {data?.map((item, index) => {
        return (
          <SwiperSlide key={index}>
            <div className="mx-4 text-center">
              <center>
                <ImageFallback
                  src={item?.FileLogo}
                  width={200}
                  height={200}
                  className="w-[200px] h-[200px] object-contain p-3 rounded-md mb-3 bg-white"
                  alt={item?.NamaOpd}
                  fallbackSrc={"/assets/images/img-logo-muba.png"}
                />
                <h3 className="text-[#45D2B0] text-base font-semibold">
                  {item?.NamaOpd?.toUpperCase()}
                </h3>
                <hr className="w-[200px] my-2" />
              </center>
              <p className="text-white text-sm font-light line-clamp-4">
                {item?.Description}
              </p>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};
