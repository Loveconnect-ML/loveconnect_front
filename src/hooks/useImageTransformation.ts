import { useState } from "react";
import { useWebcamContext } from "@/components/WebcamProvider";

const useImageTransformation = (imageUrls: string[]) => {
  const { setImageUrls } = useWebcamContext();
  const [isTransformed, setIsTransformed] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const transformImage = async () => {
    setIsLoaded(false);
    try {
      const res = await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({ image: imageUrls[0] }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setImageUrls((prev: string[]) => [...prev, data.url]);
      setIsTransformed(true);
    } catch (error) {
      console.error("Failed to transform image", error);
    } finally {
      setIsLoaded(true);
    }
  };

  return { isLoaded, isTransformed, transformImage };
};

export default useImageTransformation;
