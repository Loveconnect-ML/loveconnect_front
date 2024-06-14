"use client";
import { CameraIcon, SwitchCameraIcon } from "lucide-react";
import React, { useCallback, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Webcam from "react-webcam";
import { useWebcamContext } from "./WebcamProvider";

type Props = {};

function WebcamComponent({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();
  const [videoConstraints, setVideoConstraints] = useState({
    width: 600,
    height: 800,
    facingMode: "user",
  });
  const webcamRef = useRef<Webcam>(null);

  const flipCamera = useCallback(() => {
    const facingMode = videoConstraints.facingMode === "user" ? "environment" : "user";
    setVideoConstraints((prev) => ({ ...prev, facingMode }));
  }, [videoConstraints, setVideoConstraints]);

  // 웹캠 사진 캡쳐
  const capture = useCallback(() => {

    if (imageUrls?.length >= 5) {
      toast.error("이미지는 최대 5장까지 촬영 가능합니다");
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    if (!imageUrls) return;

    setImageUrls((prev: any) => [...prev, imageSrc]);
  }, [imageUrls, setImageUrls]);

  return (
    <div className="relative z-20 h-full">
      <Webcam
        className="aboslute z-20"
        mirrored={true}
        audio={false}
        width={600}
        height={800}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      <button className="absolute w-fit border-white border-4 z-30 top-8 right-8 p-2 bg-gray-800 text-white rounded-full" onClick={flipCamera}>
        <SwitchCameraIcon size={24} />
      </button>
      <button
        className="absolute w-fit border-white border-4 z-30 bottom-8 left-0 right-0 mx-auto p-2 bg-gray-800 text-white rounded-full"
        onClick={capture}
      >
        <CameraIcon size={24} />
      </button>
    </div>
  );
}

export default WebcamComponent;
