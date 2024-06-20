"use client";
import Image from "next/image";
import React from "react";

type Props = {
  imageUrls: string[] | null;
  selections?: string[];
  setSelections?: (selections: string[]) => void;
  download?: boolean;
  setResponseIdx?: (responseIdx: number) => void;
};

function Photos({ setResponseIdx, imageUrls, setSelections, selections, download }: Props) {
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

  const toggleResponseIdx = (idx: number) => {
    if (!setResponseIdx) {
      return;
    }
    setResponseIdx(idx);
  }

  return (
    <div className="grid grid-cols-5 gap-2 w-full h-fit p-5">
      {imageUrls?.map((url, index) => (
        <button
          key={index}
          className={`${selections?.includes(url) ? "border-4 border-indigo-300 rounded-xl" : "rounded-xl"
            }`}
          onClick={download ? () => {
            toggleResponseIdx(index)
            downloadImage(url)
          } : () => onClickToToggleSelect(url)}
        >
          <Image
            className={`rounded-xl shadow-md`}
            src={`${url}`}
            width={500}
            height={500}
            alt={`webcam-${index}`}
          />
        </button>
      ))}
      {imageUrls && [...Array(5 - imageUrls.length)].map((_, index) => (
        <div key={index} className="w-full sm:w-[88px] h-30 bg-gray-200 rounded-xl shadow-md"></div>
      ))}
    </div>
  );
}

export default Photos;
