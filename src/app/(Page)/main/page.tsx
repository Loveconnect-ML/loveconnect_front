"use client";
import Logo from "@/components/Logo";
import CircleLoading from "@/components/v2/loadings/CircleLoading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

function MainPage({ }: Props) {

  const [story, setStory] = useState<string>("");
  const [webtoonUrls, setWebtoonUrls] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (e: any) => {
    setStory(e.target.value);
  }

  const onClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (story.length === 0) {
      toast.error("스토리를 입력해주세요.");
      return;
    }

    await generateWebtoon();
  }

  const generateWebtoon = async () => {

    // API로 웹툰 생성
    setLoading(true);

    try {
      const res = await fetch("/api/v2/ai/webtoon", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: story,
        }),
      });

      const data = await res.json();
      setWebtoonUrls(data.urls);
      setLoading(false);
    } catch (error) {
      toast.error("웹툰 생성 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false);
    }
  }



  return (
    <main className="relative w-full h-full flex flex-col items-center  bg-white">
      {/* Absolute Logo */}
      <div className="z-20 absolute top-3 left-3">
        <Logo />
      </div>
      <div className="flex flex-col flex-wrap items-center w-full justify-center gap-4 mt-4 py-16 bg-white">

        {/* Main Contents */}
        <textarea
          value={story}
          onChange={onChange}
          placeholder={`스토리라인을 자세히 입력해주세요.\n\n예시: 이세계에 살았던 내가 현대 한국으로 오게 되었다...`}
          className="mt-auto text-sm mx-auto w-[90%] h-64 break-keep p-4 border-2 font-PretendardRegular border-gray-300 rounded-md resize-none"
        ></textarea>

        {/* Submit Button */}
        <button
          disabled={loading}
          onClick={onClick}
          className="font-PretendardBold w-1/2 my-auto disabled:opacity-30 text-white hover:bg-gray-900 border-white border-4 z-30 top-80 p-2 bg-gray-800 rounded-full"
        >
          웹툰 생성하기
        </button>
        {/* Webtoon Images */}

        {webtoonUrls && !loading && webtoonUrls.map((url, idx) => (
          <Image key={idx} src={url} alt="Webtoon" width={324} height={648} />
        ))}

        {/* Loading */}

        {loading &&
          <div className="mt-4 flex flex-col justify-center items-center gap-3 font-PretendardRegular">
            <CircleLoading />
            <p>웹툰 생성 중...</p>
          </div>}
      </div>
    </main>
  );
}

export default MainPage;
