"use client"
import React, { useRef, useEffect, useState } from 'react';
// import "./styles.css";
import {
  motion,
  useScroll,
  useMotionValue,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useSpring,
} from "framer-motion";

interface ParallaxProps {
  children: React.ReactNode;
  baseVelocity: number;
}

export default function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const baseX = useMotionValue(0);
  const [contentWidth, setContentWidth] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Use useEffect to measure the width of the content for wrapping
  useEffect(() => {
    if (contentRef.current) {
      setContentWidth(contentRef.current.offsetWidth);
    }
  }, [children]);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Calculate the wrap based on content width
  const wrapX = (currentX: number) => {
    // Assuming the viewport width as a reference for wrapping
    const viewportWidth = window.innerWidth;
    if (Math.abs(currentX) > contentWidth + viewportWidth) {
      return 0; // Reset position to start for infinite loop
    }
    return currentX;
  };

  const directionFactor = useRef<number>(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    const newX = wrapX(baseX.get() + moveBy);

    baseX.set(newX);
  });

  return (
    <div className="absolute flex flex-nowrap">
      <motion.div className="flex flex-nowrap" style={{ x: baseX }} ref={contentRef}>
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>{child}</React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}