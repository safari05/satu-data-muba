"use client";
import { Container, Select } from "@/components/atoms";
import RSelect from "react-select";
import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";
import datasetService from "@/services/dataset.service";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import  {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper";

import classesSpiner from './ContentDetailDesaCantik.module.css'

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "200px", // Set your desired width here
  }),
  control: (provided) => ({
    ...provided,
    minWidth: "200px", // Ensure the control itself has the minimum width
  }),
};

export const ContentDetailDesaCantik = ({ data, isKuisioner }) => {
  const [dataChart, setDataChart] = useState(data.Data.Charts);
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const datas = data.Data;
  const optionYears = datas.Tahuns.map((item) => ({
    value: item,
    label: item,
  }));

  const selectedYearOption = optionYears.find(
    (option) => option.value === datas.Tahun
  );

  const handleChangeTahun = async (selectedOption) => {
    const tahun = selectedOption ? selectedOption.value : null;
    setSelectedTahun(selectedOption);

    if (tahun) {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const fetchOneSubData = await datasetService.getOneSubData(
          isKuisioner,
          datas.Kode,
          tahun
        );
        setDataChart(fetchOneSubData.Data.Charts);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false); // Set loading to false when data fetching is complete
      }
    }
  };

  useEffect(() => {}, [dataChart]);

  const validData = dataChart.filter((item) => {
    const hasValidLabels = Array.isArray(item.Labels) && item.Labels.length > 0;
    const hasValidData =
      Array.isArray(item.Data) && item.Data.length === item.Labels.length;
    return hasValidLabels && hasValidData;
  });

  return (
    <Container>
      <div
        className="flex flex-col items-center justify-center"
        data-aos="fade-up"
      >
        <h2 className="font-bold text-center text-green-500 text-2xl">
          DESA CANTIK
        </h2>
        <h3 className="text-center text-white font-bold text-xl">
          Kab.
          <span className="font-normal text-yellow-200 uppercase">
            Musi Banyuasin
          </span>
        </h3>

        <h3 className="mt-2 text-center text-black font-bold">
          {" "}
          {datas.Judul}
        </h3>
      </div>
      <div className="flex mb-20">
        <label className="text-white uppercase text-xl "> Tahun </label>
        <RSelect
          value={selectedTahun || selectedYearOption}
          options={optionYears}
          styles={customStyles}
          className="ml-5"
          onChange={handleChangeTahun}
        />
      </div>
      {loading ? (
         <div className="flex items-center justify-center">
          <div className={classesSpiner.spinner}> 
          <p className="mb-4 text-green-400 font-semibold text-2xl"> ....</p>
            </div> {/* Show loading spinner */}
        </div>
      ) : (
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
        >
          {validData.length > 0 ? (
            validData.map((item, index) => (
              <SwiperSlide
                key={index}
                className="flex flex-col bg-slate-300 py-6 px-6 text-green-600 rounded-md h-full" // Ensure slides take full height
              >
                <h3 className="mb-4 text-green-800 text-center">
                  {item.Title}
                </h3>

                <div className="flex-grow flex items-center justify-center">
                  {item.ChartType === "bar" ? (
                    <Bar
                      data={{
                        labels: item.Labels,
                        datasets: [
                          {
                            label: item.Title || "Chart Title",
                            data: item.Data,
                            backgroundColor:
                              item.BackgroundColor || "rgba(75,192,192,0.4)",
                          },
                        ],
                      }}
                      height={300}
                      width={500}
                      options={{
                        maintainAspectRatio: false,
                      }}
                    />
                  ) : item.ChartType === "pie" ? (
                    <Doughnut
                      data={{
                        labels: item.Labels,
                        datasets: [
                          {
                            label: item.Title || "Chart Title",
                            data: item.Data,
                            backgroundColor:
                              item.BackgroundColor || "rgba(75,192,192,0.4)",
                          },
                        ],
                      }}
                      options={{
                        elements: {
                          center: {
                            legend: { display: true, position: "right" },
                            text: "Red is 2/3 the total numbers",
                            color: "#FF6384",
                            fontStyle: "Arial",
                            sidePadding: 20,
                            minFontSize: 20,
                            lineHeight: 25,
                          },
                        },
                      }}
                    />
                  ) : (
                    <div className="bg-slate-400 w-10 h-10 text-green-800">
                      No Chart
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))
          ) : (
            <SwiperSlide className="flex items-center justify-center h-full">
              <div className="bg-slate-400 w-full h-10 text-green-800">
                No Valid Data Available
              </div>
            </SwiperSlide>
          )}
        </Swiper>
      )}
    </Container>
  );
};
