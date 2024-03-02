"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useWebcamContext } from "./WebcamProvider";

type Props = {};

const videoConstraints = {
  width: 600,
  height: 800,
  facingMode: "user",
};

function WebcamComponent({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();
  // const [limit, setLimit] = useState(0);

  const webcamRef = useRef<Webcam>(null);

  // 웹캠 사진 캡쳐
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    if (!imageUrls) return;

    setImageUrls((prev: any) => [...prev, imageSrc]);
  }, [imageUrls, setImageUrls]);

  // 5초마다 웹캠 캡쳐
  useEffect(() => {

    let limit = 0;
    
    const interval = setInterval(() => {
      if (limit >= 5) {
        console.log(limit)
        clearInterval(interval);
        return
      }
      capture();
      // console.log("before", limit)
      // setLimit((prev) => prev + 1);
      limit += 1;
      // console.log("after", limit)
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Webcam
      className="z-20"
      mirrored={true}
      audio={false}
      width={600}
      height={800}
      ref={webcamRef}
      screenshotFormat="image/png"
      videoConstraints={videoConstraints}
    />
  );
}

export default WebcamComponent;
