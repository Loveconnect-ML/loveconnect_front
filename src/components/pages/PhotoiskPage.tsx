"use client";
import React, { useRef, useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";

type Props = {};

function PhotoiskPage({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();

  // const [imageFile, setImageFile] = useState<any>(null);
  // const ref = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ImageResponse[] | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onClickToGenerateImage = async () => {
    for (const image of selectedImages) {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          init_image: image,
          positivePrompt: "A beautiful landscape",
          negativePrompt: "A landscape with a lot of pollution",
        }),
      });
      const data = await res.json();
      setResponse((prev: any) => [...prev, data]);
    }
  };

  // const onUploadImage = (e: any) => {
  //   const reader = new FileReader();
  //   const file = e.target.files?.[0];
  //   reader.readAsDataURL(file);
  //   reader.onload = (data) => {
  //     setImageFile(reader.result);
  //     console.log(reader.result);
  //   };
  // };

  return (
    <>
      <Photos
        selections={selectedImages}
        setSelections={setSelectedImages}
        imageUrls={imageUrls}
      />
      <Photos
        imageUrls={response?.map((res) => "data:image/png;base64,"+ res.artifacts[0].base64) || null}
      />
      <Button
        onClick={onClickToGenerateImage}
        className="fixed bottom-4 w-[90%] sm:w-[432px]"
      >
        이미지 생성
      </Button>
    </>
  );
}

export default PhotoiskPage;
