"use client";
import Image from "next/image";
import React from "react";

type Props = {
  imageUrls: string[] | null;
  selections?: string[];
  setSelections?: (selections: string[]) => void;
  download?: boolean;
};

function Photos({ imageUrls, setSelections, selections, download }: Props) {
  if (!imageUrls) {
    return null;
  }

  const onClickToToggleSelect = (url: string) => {

    if (!setSelections) {
      return;
    }

    if (!selections) {
      return;
    }

    if (selections.includes(url)) {
      setSelections(selections.filter((selection) => selection !== url));
    } else {
      setSelections([url]);
    }
  };

  const downloadImage = (url: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = url.split("/").pop() || "download";
    a.target = '_blank';
    a.click();
  }
  

  return (
    <div className="grid grid-cols-5 w-full">
      {imageUrls?.map((url, index) => (
        <button
          key={index}
          className={`${
            selections?.includes(url) ? "border-4 border-black" : ""
          }`}
          onClick={download ? () => downloadImage(url): () => onClickToToggleSelect(url)}
        >
          <Image src={`${url}`} width={500} height={500} alt={`webcam-${index}`} />
        </button>
      ))}
    </div>
  );
}

export default Photos;
