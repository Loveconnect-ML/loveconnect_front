"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { useWebcamContext } from "./WebcamProvider";
import { motion } from "framer-motion";

type Props = {};

const videoConstraints = {
  width: 600,
  height: 800,
  facingMode: "user",
};

function WebcamComponent({}: Props) {
  const { imageUrls, setImageUrls } = useWebcamContext();
  const [time, setTime] = useState(3);
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
        clearInterval(interval);
        return;
      }
      capture();
      limit += 1;
    }, 5000);

    let zero = 5;
    const time = setInterval(() => {

      if (limit >= 5) {
        clearInterval(time);
        setTime(0);
        return;
      }

      if (zero <= 1) {
        zero = 5;
        setTime(zero);
        return;
      }
      zero -= 1;
      setTime(zero);
    }, 1000);


    return () => {
      clearInterval(interval)
      clearInterval(time)
    }
      
  }, []);

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
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute z-30 bg-gradient-to-r from-red-600 to-indigo-400 inline-block text-transparent bg-clip-text text-6xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        {time === 0 ? null : time}
      </motion.div>
    </div>
  );
}

export default WebcamComponent;
