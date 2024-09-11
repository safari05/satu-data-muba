"use client";
import React from "react";
import { Container } from "@/components/atoms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Import Swiper styles
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

// Install Swiper modules
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

export const ContentDesaCantik = () => {
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
        <h1 className="text-yellow-400 font-bold text-xl">Data Kuisioner</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div className="mt-4">
          <Swiper
             modules={[Autoplay]}
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
          >
            {data.Data.ChartKuisioners.map((survey, index) => {
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
                  className={`${backgroundColor} h-[200px] text-black rounded-xl`}
                >
                  <div className="flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-lg font-semibold">{survey.NamaPendek}</p>
                  <p className="text-md">{survey.Count}</p>
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

      <div>
        <h1 className="text-white font-bold text-xl">Data Survey</h1>
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
            {data.Data.ChartSurveys.map((survey, index) => {
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
                  className={`${backgroundColor}  text-black rounded-xl`}
                >
                  <div className="flex flex-col justify-center items-center gap-4 p-4">
                  <p className="text-lg font-semibold">{survey.NamaPendek}</p>
                  <p className="text-md">{survey.Count}</p>
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

const data = {
  Data: {
    ChartSurveys: [
      {
        Nama: "Survey Bantuan Sosial Tahun 2026",
        NamaPendek: "Survey Bantuan Sosial 2026",
        LabelTotal: "Total Data",
        Count: "0",
        Priority: true,
      },
      {
        Nama: "Survey Bantuan Sosial 2025",
        NamaPendek: "Survey BANSOS 2025",
        LabelTotal: "Total Data",
        Count: "0",
        Priority: true,
      },
      {
        Nama: "Survey BTS (Base Transceiver Station) 2024",
        NamaPendek: "Survey BTS 2024",
        LabelTotal: "Total Data",
        Count: "5",
        Priority: true,
      },
      {
        Nama: "Survey Bantuan Sosial 2024",
        NamaPendek: "Survey BANSOS 2024",
        LabelTotal: "Total Data",
        Count: "34",
        Priority: true,
      },
      {
        Nama: "Survey BTS (Base Transceiver Station) 2023",
        NamaPendek: "Survey BTS 2023",
        LabelTotal: "Total Data",
        Count: "0",
        Priority: true,
      },
      {
        Nama: "Survey Bantuan Sosial 2020",
        NamaPendek: "Survey BANSOS 2020",
        LabelTotal: "Total Data",
        Count: "0",
        Priority: true,
      },
      {
        Nama: "Survey BTS (Base Transceiver Station) 2019",
        NamaPendek: "Survey BTS 2019",
        LabelTotal: "Total Data",
        Count: "282",
        Priority: true,
      },
      {
        Nama: "Survey Bantuan Sosial 2019",
        NamaPendek: "Survey BANSOS 2019",
        LabelTotal: "Total Data",
        Count: "0",
        Priority: true,
      },
    ],
    ChartKuisioners: [
      {
        Nama: "Potensi Desa Tahun 2024",
        NamaPendek: "Potensi Desa 2024",
        LabelTotal: "Total Data",
        Count: "129",
        Priority: true,
      },
      {
        Nama: "Harga Pasar Tahun 2024",
        NamaPendek: "Harga Pasar 2024",
        LabelTotal: "Total Data",
        Count: "696",
        Priority: true,
      },
      {
        Nama: "Keluarga Tahun 2024",
        NamaPendek: "Keluarga 2024",
        LabelTotal: "Total Data",
        Count: "9.395",
        Priority: true,
      },
      {
        Nama: "Stunting Tahun 2024",
        NamaPendek: "Stunting 2024",
        LabelTotal: "Total Data",
        Count: "22",
        Priority: true,
      },
      {
        Nama: "Keluarga Tahun 2023",
        NamaPendek: "Keluarga 2023",
        LabelTotal: "Total Data",
        Count: "65.412",
        Priority: true,
      },
      {
        Nama: "Harga Pasar Tahun 2023",
        NamaPendek: "Harga Pasar 2023",
        LabelTotal: "Total Data",
        Count: "2.210",
        Priority: true,
      },
      {
        Nama: "Potensi Desa Tahun 2023",
        NamaPendek: "Potensi Desa 2023",
        LabelTotal: "Total Data",
        Count: "216",
        Priority: true,
      },
      {
        Nama: "Stunting Tahun 2023",
        NamaPendek: "Stunting 2023",
        LabelTotal: "Total Data",
        Count: "1",
        Priority: true,
      },
    ],
  },
};
