"use client";
import React, { useRef, useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";

type Props = {};

function PhotoiskPage({}: Props) {
  const { imageUrls } = useWebcamContext();
  const [response, setResponse] = useState<any | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onClickToRetouchImage = async () => {
    for (const image of selectedImages) {
      // console.log(image)
      const res = await fetch("/api/v2/sticker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
        }),
      });
      const data = await res.json();
      setResponse((prev: any) => [...prev, data]);
    }
  };

  return (
    <div className="relative h-full">
      <Photos
        selections={selectedImages}
        setSelections={setSelectedImages}
        imageUrls={imageUrls}
      />
      <Photos
        imageUrls={response?.map((res: any) => res) || null}
      />
      <Button
        onClick={onClickToRetouchImage}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] sm:w-[432px]"
      >
        이미지 생성
      </Button>
    </div>
  );
}

export default PhotoiskPage;
