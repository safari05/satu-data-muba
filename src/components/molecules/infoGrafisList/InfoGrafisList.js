import { ImageFallback } from "@/components/atoms";
import Link from "next/link";
import { MdArrowRight, MdDateRange } from "react-icons/md";

export const InfoGrafisList = ({ img, title, desc, link = "/", date }) => {
  return (
    <div className="bg-[#138489] rounded-xl p-7">
      <ImageFallback
        src={img}
        alt={"alt"}
        width={400}
        height={200}
        className="w-full h-[200px] object-cover rounded-md mb-3 bg-white p-2"
      />

      <h3 className="text-white text-lg font-bold line-clamp-2 mb-2">
        {title}
      </h3>
      {/* <div
        className="text-white line-clamp-2 mb-5 text-sm"
        dangerouslySetInnerHTML={{ __html: desc || <div /> }}
      /> */}
      <div className="flex items-center justify-between">
        <small className="text-white flex gap-2 items-center">
          <MdDateRange size={15} color="white" />
          {date}
        </small>
        <Link
          href={link}
          className="flex items-center bg-[#EF5F5F] rounded-full px-4 py-2 text-white text-center text-xs hover:bg-[#c54d4d] duration-500 cursor-pointer"
        >
          Selengkapnya
          <MdArrowRight size={15} color="white" />
        </Link>
      </div>
    </div>
  );
};
