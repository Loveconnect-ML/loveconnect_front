"use client";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  imageUrls: string[] | null;
  selections?: string[];
  setSelections?: (selections: string[]) => void;
};

function Photos({ imageUrls, setSelections, selections }: Props) {
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
      setSelections([...selections, url]);
    }
  };
  

  return (
    <div className="flex">
      {imageUrls?.map((url, index) => (
        <button
          key={index}
          className={`${
            selections?.includes(url) ? "border-4 border-black" : ""
          } rounded-lg`}
          onClick={() => onClickToToggleSelect(url)}
        >
          <Image src={`${url}`} width={500} height={500} alt={`webcam-${index}`} />
        </button>
      ))}
    </div>
  );
}

export default Photos;
