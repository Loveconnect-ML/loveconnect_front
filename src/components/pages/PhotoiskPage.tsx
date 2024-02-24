"use client";
import React, { useRef, useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";

type Props = {};

function PhotoiskPage({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();
  const imgRef = useRef<HTMLInputElement>(null);
  // const [imageFile, setImageFile] = useState<any>(null);
  // const ref = useRef<HTMLInputElement>(null);
  // const [response, setResponse] = useState<ImageResponse[] | null>([]);
  const [response, setResponse] = useState<any | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  // const [style, setStyle] = useState("anime")
  const [style, setStyle] = useState("pixel-art");

  const onClickToGenerateImage = async () => {
    for (const image of selectedImages) {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          init_image: image,
          positivePrompt:
            "just the way it is, Enhance lighting, natural, bright, Remove noise, detail sharp, Sharpen details, clear faces, background, Blur background, depth of field, focus subject, Restore old photo, remove scratches, enhance clarity, revive colors, vintage, Increase contrast, colors pop, lighting balance, Correct exposure, brighten underexposed, adjust overexposed, balanced light, Add warmth, golden hour look, warm tones, natural balance, Retouch portrait, smooth skin, remove imperfections, enhance eyes, lips, natural polished",
          negativePrompt:
            "out of image context, Do not overexpose, avoid artificial brightness, Prevent oversharpening, details too harsh, No excessive blurring, background clear, Avoid over-saturation, colors unnatural, Do not distort, keep original proportions, Avoid heavy retouching, maintain natural features, No fake warmth, colors true to life, Prevent flattening, preserve depth, texture, Avoid making too dark, maintain visibility, Do not remove essential details, characters, Keep authentic, avoid over-modification",
          style: style,
        }),
      });
      const data = await res.json();
      console.log(data);
      setResponse((prev: any) => [...prev, data]);
    }
  };

  const onClickToRetouchImage = async () => {
    for (const image of selectedImages) {
      // console.log(image)
      const res = await fetch("/api/v2/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          scale: 2,
          version: "v1.4",
        }),
      });
      const data = await res.json();
      // console.log(data);
      setResponse((prev: any) => [...prev, data]);
    }
  };

  const onClickToMixImage = async () => {
    const reader = new FileReader();
    reader.readAsDataURL(imgRef.current?.files?.[0] as Blob);

    reader.onload = async function () {
      for (const image of selectedImages) {
        const res = await fetch("/api/v2/mix", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            image1: reader.result,
            image2: image,
          }),
        });
        const data = await res.json();
        setResponse((prev: any) => [...prev, data]);
      }
    };
  };

  const onClickToFashionImage = async () => {
    for (const image of selectedImages) {
      // console.log(image)
      const res = await fetch("/api/v2/fashion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image,
          prompt: "person wearing suit and red tie",
          clothing: "topwear",
        }),
      });
      const data = await res.json();
      // console.log(data);
      setResponse((prev: any) => [...prev, data]);
    }
  };
// digital photo of a man, highly detailed, found footage, masterpiece, best quality
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
      {/* <input type="file" ref={imgRef} /> */}
      <Photos
        selections={selectedImages}
        setSelections={setSelectedImages}
        imageUrls={imageUrls}
      />
      <Photos
        // imageUrls={
        //   response?.map(
        //     (res) => "data:image/png;base64," + res.artifacts?.[0].base64
        //   ) || null
        // }
        imageUrls={response?.map((res: any) => res) || null}
      />
      <Button
        onClick={onClickToRetouchImage}
        className="fixed bottom-4 w-[90%] sm:w-[432px]"
      >
        이미지 생성
      </Button>
    </>
  );
}

export default PhotoiskPage;
