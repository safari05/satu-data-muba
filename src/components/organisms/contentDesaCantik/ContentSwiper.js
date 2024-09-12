import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
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
          className={`pagination-bullet ${
            swiper.activeIndex === index ? "active" : ""
          }`}
          onClick={() => swiper.slideTo(index * slidesPerView)}
        />
      ))}
    </div>
  );
};

function ContentSwiper({ data, isKuisioner }) {
  console.log(isKuisioner);
  return (
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
      {data.map((kuisioner, index) => {
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
              <Link
                href={`/desa-cantik/${kuisioner.Kode}/${isKuisioner}`}
                className="bg-indigo-400 text-lg px-6 py-1 rounded-xl text-white"
              >
                {" "}
                Detail
              </Link>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ContentSwiper;
