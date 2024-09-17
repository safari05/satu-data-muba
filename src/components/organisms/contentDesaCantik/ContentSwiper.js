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
import { ImageBase64 } from "@/components/atoms";
import { MdArrowRight, MdDataThresholding } from "react-icons/md";

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
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={10}
      slidesPerView={4}
      pagination={{ clickable: true }}
      navigation
      loop
      autoplay={{
        delay: 10000,
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
      <div className="grid md:grid-cols-3 gap-10 grid-cols-1">
        {data.map((item, index) => {
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
              className={` text-black rounded-xl `}
            >
              <div
                className={`${backgroundColor} group bg-[#138489] rounded-xl p-2 min-h-[300px]`}
              >
                <div className="flex flex-row items-center space-x-4">
                  <div className="flex-shrink-0">
                    <ImageBase64
                      base64String={item.Icon}
                      altInfo="icon image"
                    />
                  </div>
                  <div>
                    <h3 className="text-[#138489] font-bold font-mono text-xl">
                      {item.Nama} {item.Tahun}
                    </h3>
                  </div>
                </div>
                 <div>
                  <h2 className="text-[#138489] text-center font-bold font-mono text-xl"> Total Data <span className="text-[#EF8640]">{item.JumlahData}</span></h2> 
                   <h2 className="text-[#138489] text-center font-bold font-mono text-xl"> {item.JumlahDesa}</h2>
                 </div>
                 <div className="flex items-start mt-7 ml-2">
                  <Link
                     href={`/desa-cantik/${item.Kode}/${isKuisioner}`}
                    className="flex items-center border border-[#c54d4d] rounded-full px-4 py-2  text-center text-sm hover:bg-[#c54d4d] hover:text-white
                     duration-500 cursor-pointer"
                  >
                    Selengkapnya
                    <MdArrowRight size={15} color="#c54d4d" />
                  </Link>
                </div> 
                <div className="flex">
                {/* <div className="flex gap-2 justify-end  w-full">
                  <MdDataThresholding size={15} color="#EF8640" className="mb-6" />
                  <p className="text-[#EF8640] font-semibold text-md">{item.JumlahDesa}</p>
                </div> */}
              </div>
                </div>
               
            </SwiperSlide>
          );
        })}
      </div>
    </Swiper>
  );
}

export default ContentSwiper;
