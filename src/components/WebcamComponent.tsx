"use client";
import { CameraIcon, SwitchCameraIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Webcam from "react-webcam";
import { useWebcamContext } from "./WebcamProvider";
import { motion, useAnimate } from "framer-motion";
import Image from "next/image";

type Props = {
  mode?: "general" | "pose";
};

function WebcamComponent({ mode }: Props) {
  const { imageUrls, setImageUrls, poseUrl, setPoseUrl } = useWebcamContext();
  const [mirrored, setMirrored] = useState(true);
  const [videoConstraints, setVideoConstraints] = useState({
    width: 1080,
    height: 1920,
    facingMode: "user",
  });
  const [scope, animate] = useAnimate();

  const webcamRef = useRef<Webcam>(null);

  const flipCamera = useCallback(() => {
    const facingMode = videoConstraints.facingMode === "user" ? "environment" : "user";
    setVideoConstraints((prev) => ({ ...prev, facingMode }));
    setMirrored((prev) => !prev);
  }, [videoConstraints, setVideoConstraints]);

  // 웹캠 사진 캡쳐
  const capture = useCallback(() => {

    if (imageUrls?.length >= 5) {
      toast.error("이미지는 최대 5장까지 촬영 가능합니다");
      return;
    }

    const imageSrc = webcamRef.current?.getScreenshot();
    animate(scope.current, { backgroundColor: ["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"], transition: { duration: 0.1 } });
    if (!imageSrc) return;
    if (!imageUrls) return;


    setImageUrls((prev: any) => [...prev, imageSrc]);
  }, [imageUrls, setImageUrls]);


  return (
    <div className="relative z-50 h-full bg-white">
      <div
        ref={scope}
        className="absolute w-full h-full z-10"
      >
      </div>
      <Webcam
        className="aboslute z-20 pb-0 sm:pb-16 h-full aspect-portrait"
        mirrored={mirrored}
        audio={false}
        width={1080}
        height={1920}
        ref={webcamRef}
        screenshotFormat="image/png"
        videoConstraints={videoConstraints}
      />
      {mode === "pose" && (
        <>
          {poseUrl !== "" ?
            <div className="z-50 absolute left-4 top-4 w-24 h-24">
              <Image
                width={600}
                height={600}
                src={poseUrl}
                alt="pose"
                className="w-full h-full object-cover"
              />
            </div> : <div className="z-50 absolute text-white flex items-center justify-center text-center left-4 top-4 w-24 h-24 break-keep bg-black bg-opacity-30 text-xs">
              이곳에 생성된 포즈가 나타납니다
            </div>
          }
        </>
      )}
      <button className="absolute w-fit border-white border-4 z-30 top-8 right-8 p-2 bg-gray-800 text-white rounded-full" onClick={flipCamera}>
        <SwitchCameraIcon size={32} />
      </button>
      <button
        className="absolute w-fit border-white border-4 z-30 bottom-24 left-0 right-0 mx-auto p-2 bg-gray-800 text-white rounded-full"
        onClick={capture}
      >
        <CameraIcon size={32} />
      </button>
    </div>
  );
}

export default WebcamComponent;
