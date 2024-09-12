"use client";
import React from "react";
import { Container } from "@/components/atoms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import SwiperCore, {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper";
import Link from "next/link";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const CustomPagination = ({ swiper }) => {
  if (!swiper) return null;

  const slidesPerView = swiper.params.slidesPerView;
  const totalSlides = swiper.slides.length;
  const pages = Math.ceil(totalSlides / slidesPerView);
  console.log(`Total slides ${totalSlides}`);
  return (
    <div className="custom-pagination">
      {[...Array(pages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-bullet ${swiper.activeIndex === index ? 'active' : ''}`}
          onClick={() => swiper.slideTo(index * slidesPerView)}
        />
      ))}
    </div>
  );
};

export const ContentDesaCantik = (dataDesaCantik) => {

  if (!dataDesaCantik || !dataDesaCantik.dataDesaCantik) {
    return <div>Loading...</div>;
  }
  return (
    <Container>
      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-up"
      >
        <h2 className="font-bold text-center text-green-500 text-2xl">
          DESA CANTIK
        </h2>
        <h3
          className="text-center text-white font-bold text-xl mb-3"
          data-aos="fade-right"
        >
          Kab.
          <span className="font-normal text-yellow-200 uppercase">
            Musi Banyuasin
          </span>
        </h3>
      </div>

      <div className="mb-10">
        <h1 className="text-yellow-400 font-bold text-xl">
          {dataDesaCantik.dataDesaCantik.Data.Kuisioner.Judul}
        </h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="mt-4">
          <Swiper
             modules={[Autoplay, Pagination, Navigation]}
             spaceBetween={10}
             slidesPerView={4}
             pagination={{ clickable: true }}
             navigation
             loop
             autoplay={{
               delay: 3000,
               disableOnInteraction: false,
             }}
             breakpoints={{
               640: {
                 slidesPerView: 1, // 1 slide per view on small screens
               },
               768: {
                 slidesPerView: 2, // 2 slides per view on medium screens
               },
               1024: {
                 slidesPerView: 4, // 4 slides per view on large screens
               },
             }}
             onInit={(swiper) => {
              // Attach custom pagination
              swiper.params.customPagination = <CustomPagination swiper={swiper} />;
            }}
          >
            {dataDesaCantik.dataDesaCantik.Data.Kuisioner.Items.map(
              (kuisioner, index) => {
                const backgroundColors = [
                  "bg-blue-100",
                  "bg-green-100",
                  "bg-yellow-100",
                  "bg-red-100",
                  "bg-purple-100",
                ];

                const backgroundColor =
                  backgroundColors[index % backgroundColors.length];

                return (
                  <SwiperSlide
                    key={index}
                    className={`${backgroundColor} h-[200px] text-black rounded-xl `}
                  >
                    <div className="flex flex-col gap-4 p-4 ">
                      <p className="text-lg font-semibold text-center">
                        {kuisioner.Nama} <span> {kuisioner.Tahun}</span>
                      </p>
                      <p className="text-center font-bold  text-green-600 text-2xl">
                        {kuisioner.JumlahData}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-base py-2 px-2 text-yellow-600">
                          {kuisioner.JumlahDesa}
                        </span>
                      </div>
                      <Link href={`/desa-cantik/${kuisioner.Nama}`} className="bg-indigo-400 text-lg px-6 py-1 rounded-xl text-white"> Detail</Link>
                     
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </Swiper>
        </div>
      </div>

      <div>
        <h1 className="text-white font-bold text-xl">{dataDesaCantik.dataDesaCantik.Data.Survey.Judul}</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="mt-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1, // 1 slide per view on small screens
              },
              768: {
                slidesPerView: 2, // 2 slides per view on medium screens
              },
              1024: {
                slidesPerView: 4, // 4 slides per view on large screens
              },
            }}
          >
            {dataDesaCantik.dataDesaCantik.Data.Survey.Items.map((survey, index) => {
              const backgroundColors = [
                "bg-blue-100",
                "bg-green-100",
                "bg-yellow-100",
                "bg-red-100",
                "bg-purple-100",
              ];

              const backgroundColor =
                backgroundColors[index % backgroundColors.length];

              return (
                <SwiperSlide
                    key={index}
                    className={`${backgroundColor} h-[200px] text-black rounded-xl `}
                  >
                    <div className="flex flex-col gap-4 p-4 ">
                      <p className="text-lg font-semibold text-center">
                        {survey.Nama} <span> {survey.Tahun}</span>
                      </p>
                      <p className="text-center font-bold  text-green-600 text-2xl">
                        {survey.JumlahData}
                      </p>
                      <div className="flex justify-between">
                        <span className="text-base py-2 px-2 text-yellow-600">
                          {survey.JumlahDesa}
                        </span>
                      </div>
                      <button className="bg-indigo-400 text-lg px-6 py-1 rounded-xl text-white">
                        Detail
                      </button>
                    </div>
                  </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

