"use client";
import { Container, Select } from "@/components/atoms";
import RSelect from "react-select";
import { useEffect, useState } from "react";
import datasetService from "@/services/dataset.service";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import classesSpiner from "./ContentDetailDesaCantik.module.css";
import ContentPieChart from "./ContentPieChart";
import ContentBarChart from "./ContentBarChart";
import ContentLineChart from "./ContentLineChart";
import ContentStackBarChart from "./ContentStackBarChart";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "200px",
  }),
  control: (provided) => ({
    ...provided,
    minWidth: "200px",
  }),
};

export const ContentDetailDesaCantik = ({ data, isKuisioner }) => {
  const [dataChart, setDataChart] = useState(data.Data.Charts);
  const [dataChart1, setDataChart1] = useState(data.Data.Charts1);
  const [judul, setJudul] = useState(data.Data.Judul);
  const [selectedTahun, setSelectedTahun] = useState(null);
  const [loading, setLoading] = useState(false);
  const [swiperWidth, setSwiperWidth] = useState("100%");

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
      setLoading(true);
      try {
        const fetchOneSubData = await datasetService.getOneSubData(
          isKuisioner,
          datas.Kode,
          tahun
        );
        setDataChart(fetchOneSubData.Data.Charts);
        setJudul(fetchOneSubData.Data.Judul);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Check if any chart type is "pie" and adjust swiperWidth
    const hasPieChart = dataChart.some((item) => item.ChartType === "pie");
    if (hasPieChart) {
      setSwiperWidth("50%");
    } else {
      setSwiperWidth("100%");
    }
  }, [dataChart]);

  const validData = dataChart.filter((item) => {
    const hasValidLabels = Array.isArray(item.Labels) && item.Labels.length > 0;
    const hasValidData =
      Array.isArray(item.Data) && item.Data.length === item.Labels.length;
    return hasValidLabels && hasValidData;
  });

  const isValidChartItem = (item) => {
    const hasValidLabels = Array.isArray(item.Labels) && item.Labels.length > 0;

    const hasValidData =
      Array.isArray(item.Data) &&
      item.Data.every((desil) => {
        return (
          desil.Name && // Ensure the Name exists
          Array.isArray(desil.Data) && // Ensure Data is an array
          desil.Data.every(
            (valueObj) =>
              valueObj.Value !== undefined && // Ensure Value exists
              valueObj.Color !== undefined // Ensure Color exists
          )
        );
      });

    return hasValidLabels && hasValidData;
  };

  // Validate dataChart1
  const validChart1 = Array.isArray(dataChart1)
    ? dataChart1.filter(isValidChartItem)
    : [];

  // Optionally, handle the case where dataChart1 is null or not an array
  if (!Array.isArray(dataChart1)) {
    console.log("dataChart1 is null or not an array.");
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
        <h3 className="text-center text-white font-bold text-xl">
          Kab.
          <span className="font-normal text-yellow-200 uppercase">
            Musi Banyuasin
          </span>
        </h3>
        <h3 className="mt-2 text-center text-white font-bold text-xl mb-2">
          {" "}
          {judul}
        </h3>
      </div>
      {/* <div className="flex mb-10">
        <label className="text-white uppercase text-xl"> Tahun </label>
        <RSelect
          value={selectedTahun || selectedYearOption}
          options={optionYears}
          styles={customStyles}
          className="ml-5 z-30"
          onChange={handleChangeTahun}
        />
      </div> */}
      {loading ? (
        <div className="flex items-center justify-center">
          <div className={classesSpiner.spinner}>
            <p className="mb-4 text-green-400 font-semibold text-2xl"> ....</p>
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={10}
          slidesPerView={1}
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
              slidesPerView: 1, // 1 slides per view on medium screens
            },
            1024: {
              slidesPerView: 1, // 1 slides per view on large screens
            },
          }}
          style={{ width: "100%" }}
        >
          {validData.map((item, index) => {
            const slideWidth = item.ChartType === "pie" ? "50%" : "100%";
            const shouldRender = item.Data.length > 0 && item.Labels.length;

            return shouldRender ? (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center text-green-600 rounded-md"
                style={{ width: slideWidth }} // Apply dynamic width
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <h3 className="mb-4 text-white text-center font-bold text-2xl">
                    {item.Title} 
                  </h3>
                  {item.ChartType === "bar" ? (
                    <div
                      className="bg-green-200 rounded-xl flex items-center justify-center py-6 px-6 h-1/2"
                      style={{ width: slideWidth }}
                    >
                      <ContentBarChart
                        labels={item.Labels}
                        dataSeries={item.Data}
                        background={item.BackgroundColor}
                      />
                    </div>
                  ) : item.ChartType === "pie" ? (
                    <div
                      className="bg-green-200  rounded-xl flex items-center justify-center py-6 px-6"
                      style={{ width: slideWidth }}
                    >
                      <ContentPieChart
                        labels={item.Labels}
                        dataSeries={item.Data}
                        background={item.BackgroundColor}
                      />
                    </div>
                  ) : item.ChartType === "line" ? (
                    <div
                      className="bg-green-200  rounded-xl   flex items-center justify-center"
                      style={{ width: slideWidth }}
                    >
                      <ContentLineChart
                        title={item.Title || "Chart Line Title"}
                        labels={item.Labels}
                        dataSeries={item.Data}
                        background={item.BackgroundColor}
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-400 w-10 h-10 text-green-800">
                      No Chart
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ) : null;
          })}

          {validChart1.map((item, index) => {
            const slideWidth = item.ChartType === "pie" ? "50%" : "100%";
            const shouldRender = item.Data.length > 0 && item.Labels.length;

            return shouldRender ? (
              <SwiperSlide
                key={index}
                className="flex items-center justify-center text-green-600 rounded-md"
                style={{ width: slideWidth }} // Apply dynamic width
              >
                <div className="flex flex-col items-center justify-center w-full">
                <h3 className="mb-4 text-white text-center font-bold text-2xl">
                    {item.Title} 
                  </h3>
                  {item.ChartType === "bar" ? (
                    <div
                      className="bg-green-200 rounded-xl flex items-center justify-center py-6 px-6 w-full"
                      style={{ width: slideWidth }}
                    >
                      <ContentStackBarChart
                        labels={item.Labels}
                        dataSeries={item.Data}
                        background={item.BackgroundColor}
                      />
                    </div>
                  ) : (
                    <div className="bg-slate-400 w-10 h-10 text-green-800">
                      No Chart
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ) : null;
          })}
        </Swiper>
      )}
    </Container>
  );
};
