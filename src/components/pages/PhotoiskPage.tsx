"use client";
import React, { useRef, useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";

type Props = {};

function PhotoiskPage({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();

  const [imageFile, setImageFile] = useState<any>(null);
  const ref = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<ImageResponse | null>(null);

  const onClickToGenerateImage = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        init_image: imageFile,
        positivePrompt: "A beautiful landscape",
        negativePrompt: "A landscape with a lot of pollution",
      }),
    });
    const data = await res.json();
    setResponse(data);
  };

  const onUploadImage = (e: any) => {
    const reader = new FileReader();
    const file = e.target.files?.[0];
    reader.readAsDataURL(file);
    reader.onload = (data) => {
      setImageFile(reader.result);
      console.log(reader.result);
    };
  };

  return (
    <>
      {/* <input type="file" accept="image/*" onChange={onUploadImage} ref={ref} />
      <Image
        src={
          `data:image/png;base64,${response?.artifacts?.[0]?.base64}` ??
          "/test.png"
        }
        alt="generated image"
        width={100}
        height={100}
      /> */}
      <Photos imageUrls={imageUrls} />
      <Button
        // onClick={onClickToGenerateImage}
        className="fixed bottom-4 w-[90%] sm:w-[432px]"
      >
        이미지 생성
      </Button>
    </>
  );
}

export default PhotoiskPage;
