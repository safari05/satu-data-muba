"use client";
import { ImageFallback } from "@/components/atoms";
import Link from "next/link";
import React from "react";
import { MdCalendarMonth } from "react-icons/md";
import { Player, BigPlayButton } from "video-react";

export const NewsList = ({
  img,
  alt,
  no,
  type,
  title,
  desc,
  lastUpdate,
  href,
}) => {
  return (
    <div>
      {type === 1 ? (
        <ImageFallback
          src={img}
          width={600}
          height={300}
          alt={alt}
          className="w-[600px] h-[200px] object-cover rounded-md mb-5"
        />
      ) : (
        <div className="w-full h-[200px] rounded-md mb-5">
          <Player playsInline fluid={false} width={"100%"} height={200}>
            <source src={img} className="rounded-md bg-white" />
            <BigPlayButton position="center" />
          </Player>
        </div>
      )}
      <Link href={href}>
        <div className="flex items-start gap-2">
          <div className="w-1.5/12">
            <div className="w-10 h-10 rounded-md bg-[#22D4EC] flex items-center justify-center">
              <h1 className="text-white font-bold text-xl text-center">{no}</h1>
            </div>
          </div>
          <div className="w-10/12">
            <h3 className="text-white font-semibold text-sm font-mono line-clamp-2 mb-2">
              {title}
            </h3>
            <p className="text-white font-normal text-xs font-mono line-clamp-3 mb-2">
              {desc}
            </p>
            <p className="font-light text-white text-xs flex items-center gap-2">
              <MdCalendarMonth size={14} color="white" /> Terakhir Diperbarui :{" "}
              {lastUpdate}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
