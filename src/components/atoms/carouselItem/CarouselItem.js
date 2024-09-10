"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";

export const CarouselItem = ({ children }) => {
  return <SwiperSlide>{children}</SwiperSlide>;
};
