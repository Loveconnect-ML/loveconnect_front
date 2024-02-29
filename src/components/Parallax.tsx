"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
  animate,
} from "framer-motion";
import useMeasure from "react-use-measure";
import Image from "next/image";
import LogoImage from "/public/Logo.png";
// import { wrap } from "@motionone/utils";

interface ParallaxProps {
  // children: React.ReactNode;
}

export default function Parallax({}: ParallaxProps) {
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    controls = animate(xTranslation, [0, finalPosition], {
      ease: "linear",
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      repeatDelay: 0,
    });

    return controls.stop;
  }, [xTranslation, width]);

  return (
    <div className="py-8">
      <motion.div
        ref={ref}
        style={{ x: xTranslation }}
        className="absolute left-0 overflow-x-hidden flex gap-4"
      >
        <div className="relative overflow-hidden h-[200px] w-[200px] rounded-xl">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Image
              key={i}
              style={{ objectFit: "cover" }}
              fill
              src={LogoImage}
              alt="SSCC"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
