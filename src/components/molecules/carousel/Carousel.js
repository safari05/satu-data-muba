"use client";
import Image from "next/image";
import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";

export const Carousel = ({ children }) => {
  return (
    <Swiper
      direction={"horizontal"}
      navigation={true}
      pagination={{
        clickable: true,
      }}
      modules={[Navigation, Autoplay]}
    >
      {children}
    </Swiper>
  );
};
