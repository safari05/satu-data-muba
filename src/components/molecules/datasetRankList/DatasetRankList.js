import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdCalendarMonth } from "react-icons/md";

export const DatasetRankList = ({ slug, title, desc, lastUpdate }) => {
  return (
    <Link href={`/data/${slug}`}>
      <div className="flex items-start gap-3 mb-5 md:mb-0 md:mt-5">
        <Image
          src={"/assets/icons/ic-dataset.svg"}
          width={13}
          height={13}
          alt="ic-dataset"
        />
        <div className="-mt-2">
          <h3 className="text-[#45D2B0] text-base font-semibold line-clamp-1">
            {title}
          </h3>
          <div
            className="text-white text-sm font-light line-clamp-2 mb-2"
            dangerouslySetInnerHTML={{ __html: desc }}
          />
          <p className="font-light text-white text-xs flex items-center gap-2">
            <MdCalendarMonth size={14} color="white" /> Terakhir Diperbarui :{" "}
            {lastUpdate}
          </p>
        </div>
      </div>
    </Link>
  );
};
