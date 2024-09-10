"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ImageFallback = ({
  src,
  fallbackSrc = "/assets/images/img-empty.png",
  ...rest
}) => {
  const [imgSrc, set_imgSrc] = useState(src);

  useEffect(() => {
    set_imgSrc(src);
  }, [src]);

  return (
    <Image
      {...rest}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          set_imgSrc(fallbackSrc);
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc);
      }}
      loading="lazy"
    />
  );
};
