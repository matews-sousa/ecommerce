"use client";

import NextImage from "next/image";
import { urlForImage } from "../../sanity/lib/image";
import { Image } from "sanity";
import { useState } from "react";

interface Props {
  images: Image[];
  name: string;
}

export default function ProductImages({ images, name }: Props) {
  const [currentImage, setCurrentImage] = useState<Image>(images[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full overflow-hidden bg-gray-200">
        <NextImage
          src={urlForImage(currentImage).url()}
          width={1000}
          height={1000}
          alt={name}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex gap-4">
        {images.map((image) => (
          <button
            key={image.asset?._key}
            className={
              currentImage === image
                ? "rounded-md ring ring-blue-500"
                : "cursor-pointer opacity-50 hover:opacity-100"
            }
            onClick={() => setCurrentImage(image)}
          >
            <NextImage
              src={urlForImage(image).url()}
              width={500}
              height={500}
              alt={name}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
