import Image from "next/image";
import React from "react";

type Props = {
  imageUrls: string[] | null;
};

function Photos({ imageUrls }: Props) {
  if (!imageUrls) {
    return null;
  }

  // console.log(imageUrls);

  return (
    <div className="flex">
      {imageUrls?.map((url, index) => (
        <Image key={index} src={url} width={128} height={128} alt={`webcam-${index}`} />
      ))}
    </div>
  );
}

export default Photos;
