"use client";
import React, { useRef, useState } from "react";
import { useWebcamContext } from "../WebcamProvider";
import { Button } from "../ui/button";
import Photos from "../Photos";
import WaveBackground from "../WaveBackground";
import { Loading } from "../Loading";

type Props = {};
// 밝은 조명에서 하면 더 잘 나옴, 정면 얼굴이 가장 잘 나옴
function PhotoiskPage({}: Props) {
  const { imageUrls } = useWebcamContext();
  const [response, setResponse] = useState<any | null>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const onClickToRetouchImage = async (e: any) => {
    e.preventDefault();

    if (selectedImages.length === 0) {
      alert("이미지를 선택해주세요");
      return;
    }

    if (clicked) {
      alert("이미지 생성 중입니다...");
      return;
    }

    setClicked(true);
    setLoading(true);
    for (const image of selectedImages) {
      const res = await fetch("/api/sticker", {
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
    setLoading(false);
  };

  return (
    <>
      <WaveBackground />
      <div className="relative h-full pb-[20%] bg-white">
        <Photos
          selections={selectedImages}
          setSelections={setSelectedImages}
          imageUrls={imageUrls}
        />

        {loading ? (
          <div className="w-full gap-16 flex flex-col items-center justify-center">
            <Loading />
            <p>최대 3분이 걸릴 수 있습니다...</p>
          </div>
        ) : (
          <Photos imageUrls={response?.map((res: any) => res) || null} />
        )}
      </div>
      <Button
        disabled={clicked}
        onClick={onClickToRetouchImage}
        className="absolute left-1/2 -translate-x-1/2 bottom-4 w-[90%] sm:w-[432px]"
      >
        이미지 생성
      </Button>
    </>
  );
}

export default PhotoiskPage;
